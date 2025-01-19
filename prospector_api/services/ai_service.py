from pydantic import BaseModel
from openai import OpenAI
import os
import json
import time

key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=key)

class estateExtraction(BaseModel):
    description: str
    city: str
    price: int
    surface: str
    type: str
    rents: str
    seler_agency_name: str
    seller_name: str
    seller_mail: str
    seller_phone: str

def extract_text(text):
    try:
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": "You are an expert at structured data extraction."},
                {"role": "user", "content": text}
            ],
            response_format=estateExtraction,
        )
        return json.loads(completion.choices[0].message.content)
    except openai.error.RateLimitError as e:
        print("Rate limit exceeded. Retrying after a short delay...")
        time.sleep(5)  # Wait for a while before retrying
        return extract_text(text)  # Retry the request
    except Exception as e:
        print(f"An error occurred: {e}")

def summarizeUserView(message, previusSummary = None):  
    """
    Summarizes the user's view based on the provided message.

    Parameters:
    - message (str): The message to be summarized.

    Returns:
    - str: The summary of the message.
    """
    try:
        print('message content', message['content'])
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            max_tokens=1024,
            messages=[
                {"role": "system", "content": "You are an expert at summarizing user views as a real estate investor."},
                {"role": "user", "content": "Résumez le texte suivant. Fournissez uniquement un résumé concis, en vous concentrant sur les points clés et les idées principales. Ne fournissez pas de réponse ou d'explication supplémentaire:" + previusSummary + ' ' + message['content']}
            ],
        )
        summary_long = completion.choices[0].message.content

        completion2 = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            max_tokens=256,
            messages=[
                {"role": "system", "content": "You are an expert at super short summarizing user views as a real estate investor."},
                {"role": "user", "content": "A partir du résumé suivant, fournissez une version la plus courte possible en ne gardant que les idées essentielles si besoin pour rester en dessous de 256 tokens. Ne fournissez pas de réponse ou d'explication supplémentaire:" + summary_long}
            ],
        )
        summary_short = completion2.choices[0].message.content

        return {'summarize_long': summary_long, 'summarize_short': summary_short}
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def generateOffer(owner, prospection_details, userSummary, priceWanted, instructions):
    try:
        
        ownerName = owner.get('name', '')
        description = prospection_details.get('resume', '')
        address = prospection_details.get('address', '')
        city = prospection_details.get('city', '')
        price = str(prospection_details.get('price', 0))
        instructionString = ''
        if instructions:
            instructionString = 'Je tiens à préciser que: ' + instructions


        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            max_tokens=1024,
            messages=[
                {"role": "system", "content": "You are an expert at generating offers for real estate."},
                {"role": "user", "content": "Créez une offre d'achat en mon nom: " + ownerName + " pour le bien suivant dont voici la description: " 
                            + description + "qui est proposé au prix de" + price + " dans la ville de " + city + " et se situe a l'adresse suivante: " + address
                            + " basé sur le profil de l'utilisateur suivant: " + userSummary 
                            + ". L'offre est faite au prix de: " + str(priceWanted) + "."
                            + "Ne fournissez que le contenu textuel de l'offre avec la meilleur argumentation possible." 
                            + "Ne fournissez pas les informations telles que le nom du vendeur, acquéreur et la formule de politesse."
                            + "Fournissez cette offre sous la forme d'un texte en html css de sorte a ce qu'il puisse être facilement transformé en pdf."
                            + "Dans les styles css, ne mettez pas de couleur de fond ni de border. les espaces entre les paragraphes doivent avoir une hauteur de 1.5em."
                            + "le résultat doit pouvoir etre converti dirrectement en pdf."
                            + instructionString
                            }
            ],
        )
        return completion.choices[0].message.content.split("<!DOCTYPE html>")[1].strip().strip("```")

    except Exception as e:
        print(f"An error occurred: {e}")