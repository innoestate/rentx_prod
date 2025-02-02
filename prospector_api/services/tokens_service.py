from data.data_fetcher import DataFetcher

def getUserTokens(user_id):
    return DataFetcher.get_user_tokens(user_id)


def useUserTokens(user_id, tokens_to_use):
    return DataFetcher.use_user_tokens(user_id, tokens_to_use)