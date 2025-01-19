import psycopg2
from psycopg2 import sql
import os

class DataFetcher:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(DataFetcher, cls).__new__(cls)
            cls._instance.__init__(*args, **kwargs)
        return cls._instance

    def __init__(self):
        print('init data fetcher')
        if not hasattr(self, '_initialized'):
            self._db_config = {
                'dbname': os.getenv('DB_DATABASE'),
                'user': os.getenv('DB_USERNAME'),
                'password': os.getenv('DB_PASSWORD'),
                'host': os.getenv('DB_HOST'),
                'port': os.getenv('DB_PORT')
            }
            print(self._db_config)
            self.connection = None
            self._initialized = True

    @staticmethod
    def get_instance():
        if DataFetcher._instance is None:
            DataFetcher()
        return DataFetcher._instance   

    @staticmethod
    def connect():
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            try:
                instance.connection = psycopg2.connect(**instance._db_config)
            except psycopg2.Error as e:
                print(f"Error connecting to database: {e}")

    def get_user_id(email: str):
        """Get the user_id associated with the given email"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        with instance.connection.cursor() as cursor:
            query = sql.SQL('SELECT id FROM users WHERE email = %s')
            cursor.execute(query, (email,))
            result = cursor.fetchone()
            return result[0] if result else None

    @staticmethod
    async def add_prospection(prospection_data):
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    INSERT INTO prospections (
                        city, address, link, seller_id, user_id, price,
                        emission_date, offer_id, construction_cost, rents,
                        resume, comment
                    ) VALUES (
                        %(city)s, %(address)s, %(link)s, %(seller_id)s, %(user_id)s, %(price)s,
                        %(emission_date)s, %(offer_id)s, %(construction_cost)s, %(rents)s,
                        %(resume)s, %(comment)s
                    )
                ''')
                cursor.execute(query, prospection_data)
                instance.connection.commit()
        except psycopg2.Error as e:
            print(f"Error adding prospection: {e}")
            instance.connection.rollback()

    
    @staticmethod
    async def get_prospection(prospection_id):
        """Retrieve a prospection entry by its ID and return it as a dictionary"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    SELECT * FROM prospections
                    WHERE id = %(prospection_id)s
                ''')
                cursor.execute(query, {'prospection_id': prospection_id})
                result = cursor.fetchone()
                if result:
                    # Get column names
                    column_names = [desc[0] for desc in cursor.description]
                    # Create a dictionary with column names as keys
                    result_dict = dict(zip(column_names, result))
                    return result_dict
                return None
        except psycopg2.Error as e:
            print(f"Error retrieving prospection with ID {prospection_id}: {e}")
            return None



    @staticmethod
    async def add_seller(seller_data):
        """Add a new seller to the database"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    INSERT INTO sellers (
                        user_id, name, phone, email, address, agency
                    ) VALUES (
                        %(user_id)s, %(name)s, %(phone)s, %(email)s, %(address)s, %(agency)s
                    ) RETURNING id
                ''')
                cursor.execute(query, seller_data)
                seller_id = cursor.fetchone()[0]
                instance.connection.commit()
                return {"id": seller_id, **seller_data}
        except psycopg2.Error as e:
            print(f"Error adding seller: {e}")
            instance.connection.rollback()

    @staticmethod
    async def add_ai_view_message_in_history(promptData):
        """Add a message in the history of add_ai_view_history"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    INSERT INTO prospector_ai_view_history (
                        user_id, model, role, content
                    ) VALUES (
                        %(user_id)s, %(model)s, %(role)s, %(content)s
                    ) RETURNING id
                ''')
                cursor.execute(query, promptData)
                message_id = cursor.fetchone()[0]
                instance.connection.commit()
                return {"id": message_id, **promptData}
        except psycopg2.Error as e:
            print(f"Error adding message in ai_view_history: {e}")
            instance.connection.rollback()

    @staticmethod
    async def add_prospector_ai_view_summarize(user_id: str, summarize_long: str, summarize_short: str):
        """Insert a new row into the prospector_ai_view_summarize table."""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    INSERT INTO prospector_ai_view_summarize (
                        user_id, summarize_long, summarize_short
                    ) VALUES (
                        %(user_id)s, %(summarize_long)s, %(summarize_short)s
                    )
                ''')
                cursor.execute(query, {
                    'user_id': user_id,
                    'summarize_long': summarize_long,
                    'summarize_short': summarize_short,
                })
                instance.connection.commit()
        except psycopg2.Error as e:
            print(f"Error adding row to prospector_ai_view_summarize: {e}")
            instance.connection.rollback()

    @staticmethod
    async def get_last_prospector_ai_view_summarize(user_id: str):
        """Retrieve the last entry for a specific user_id from the prospector_ai_view_summarize table."""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('''
                    SELECT * FROM prospector_ai_view_summarize
                    WHERE user_id = %(user_id)s
                    ORDER BY created_at DESC
                    LIMIT 1
                ''')
                cursor.execute(query, {'user_id': user_id})
                result = cursor.fetchone()
                return result
                
        except psycopg2.Error as e:
            print(f"Error retrieving last entry from prospector_ai_view_summarize: {e}")
            return None

    @staticmethod
    async def fetch_owner_by_id(owner_id: str):
        """Fetch an owner by their ID"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('SELECT * FROM owners WHERE id = %(id)s')
                cursor.execute(query, {'id': owner_id})
                result = cursor.fetchone()
                if result:
                    # Get column names
                    column_names = [desc[0] for desc in cursor.description]
                    # Create a dictionary with column names as keys
                    result_dict = dict(zip(column_names, result))
                    return result_dict
        except psycopg2.Error as e:
            print(f"Error fetching owner with ID {owner_id}: {e}")
            return None

    @staticmethod
    async def fetch_seller_by_id(seller_id: str):
        """Fetch a seller by their ID"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('SELECT * FROM sellers WHERE id = %(id)s')
                cursor.execute(query, {'id': seller_id})
                result = cursor.fetchone()
                if result:
                    # Get column names
                    column_names = [desc[0] for desc in cursor.description]
                    # Create a dictionary with column names as keys
                    result_dict = dict(zip(column_names, result))
                    return result_dict
        except psycopg2.Error as e:
            print(f"Error fetching seller with ID {seller_id}: {e}")
            return None

    @staticmethod
    async def fetch_first_owner_by_user_id(user_id: str):
        """Fetch the first owner by user_id"""
        instance = DataFetcher.get_instance()
        if instance.connection is None:
            DataFetcher.connect()
        try:
            with instance.connection.cursor() as cursor:
                query = sql.SQL('SELECT * FROM owners WHERE user_id = %(user_id)s ORDER BY id LIMIT 1')
                cursor.execute(query, {'user_id': user_id})
                result = cursor.fetchone()
                if result:
                    # Get column names
                    column_names = [desc[0] for desc in cursor.description]
                    # Create a dictionary with column names as keys
                    result_dict = dict(zip(column_names, result))
                    return result_dict
                return None
        except psycopg2.Error as e:
            print(f"Error fetching first owner with user_id {user_id}: {e}")
            return None