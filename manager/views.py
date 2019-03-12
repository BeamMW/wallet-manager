# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK
import requests
import json

WALLET_API_URL = "http://127.0.0.1:10000/api/wallet"


@api_view(['GET'])
def create_address(request):
    r = requests.post(WALLET_API_URL,
                      json={'jsonrpc': '2.0', 'id': 1, 'method': 'create_address', 'params': {'lifetime': 24}})

    return Response(json.loads(r.text), status=HTTP_200_OK)


@api_view(['GET'])
def get_wallet_status(request):
    r = requests.post(WALLET_API_URL,
                      json={'jsonrpc': '2.0', 'id': 6, 'method': 'wallet_status'})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_utxo(request):
    r = requests.post(WALLET_API_URL,
                      json={'jsonrpc': '2.0', 'id': 7, 'method': 'get_utxo'})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_tx_list(request):
    r = requests.post(WALLET_API_URL,
                      json={'jsonrpc': '2.0', 'id': 8, 'method': 'tx_list'})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)
