# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

import io
import subprocess
import getpass
import requests
import json
import redis
import datetime
import os
import signal
import psutil

from psutil import NoSuchProcess

from .models import *
from .serializers import *

WALLET_API_URL = "http://127.0.0.1:"
WALLET_API_PATH = "/api/wallet"
_redis = redis.Redis(host='localhost', port=6379, db=0)


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    @staticmethod
    def list(request, *args, **kwargs):
        wallets = Wallet.objects.all()
        serializer = WalletSerializer(wallets, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def create_address(request):
    port = request.GET['port']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 1,
                            'method': 'create_address',
                            'params': {
                                'lifetime': 24
                            }})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)

@api_view(['GET'])
def edit_address(request):
    port = request.GET['port']
    address = request.GET['address']
    comment = request.GET['comment']
    expiration = request.GET['expiration']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 8,
                            'method': 'edit_address',
                            'params': {
                                'address': address,
                                'comment': comment,
                                'expiration': expiration
                            }})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def delete_address(request):
    port = request.GET['port']
    address = request.GET['address']

    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 8,
                            'method': 'delete_address',
                            'params': {
                                'address': address
                            }})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_wallet_status(request):
    port = request.GET['port']

    try:
        r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                       json={'jsonrpc': '2.0', 'id': 6, 'method': 'wallet_status'})
        result = json.loads(r.text)['result']
        _redis.set('wallet_status', JSONRenderer().render(result))
    except requests.exceptions.RequestException as e:
        result = _redis.get('wallet_status')
        stream = io.BytesIO(result)
        result = JSONParser().parse(stream)

    return Response(result, status=HTTP_200_OK)


@api_view(['GET'])
def get_utxo(request):
    port = request.GET['port']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0', 'id': 7, 'method': 'get_utxo'})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_addr_list(request):
    port = request.GET['port']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0', 'id': 8, 'method': 'addr_list', 'params': {'own': True}})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_contacts_list(request):
    port = request.GET['port']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0', 'id': 8, 'method': 'addr_list', 'params': {'own': False}})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def get_tx_list(request):
    port = request.GET['port']
    try:
        r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                          json={'jsonrpc': '2.0', 'id': 8, 'method': 'tx_list'})
        result = json.loads(r.text)['result']
        _redis.set('tx_list', JSONRenderer().render(result))
    except requests.exceptions.RequestException as e:
        result = _redis.get('tx_list')
        stream = io.BytesIO(result)
        result = JSONParser().parse(stream)

    is_added = _redis.exists("added")
    if _redis.exists("process_id"):
        try:
            if is_added == 0:
                _redis.set('added_time', datetime.datetime.now().timestamp())
            psutil.Process(pid=int(_redis.get("process_id").decode('utf-8')))
            result.insert(0, {"comment": "",
                              "create_time": _redis.get('added_time'),
                              "fee": 10,
                              "income": False,
                              "kernel": "",
                              "receiver": _redis.get('receiver'),
                              "sender": "1",
                              "status": 3,
                              "status_string": "swapping",
                              "txId": "",
                              "value": 100000000})
            _redis.set('added', 1)
        except NoSuchProcess:
            if is_added == 1:
                _redis.delete('receiver')
                _redis.delete('added')
                _redis.delete('added_time')
                _redis.delete("process_id")
                subprocess.Popen('wallet-api --node_addr=eu-node01.masternet.beam.mw:8100 --pass=123 --use_http=1',
                                 shell=True, stdin=None, stdout=None, stderr=None, close_fds=True)
    return Response(result, status=HTTP_200_OK)


@api_view(['GET'])
def tx_send(request):
    port = request.GET['port']
    fee = request.GET['fee']
    from_address = request.GET['from']
    to_address = request.GET['address']
    comment = request.GET['comment']
    value = request.GET['value']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 2,
                            'method': 'tx_send',
                            'params': {
                                'value': int(value),
                                'fee': int(fee),
                                'from': from_address,
                                'address': to_address,
                                'comment': comment
                            }})
    result = json.loads(r.text)
    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def tx_swap(request):
    address = request.GET['address']
    amount_beam = request.GET['amount_beam']
    amount_btc = request.GET['amount_btc']

    _redis.set('receiver', address)

    for proc in psutil.process_iter():
        if "wallet-api".lower() in proc.name().lower():
            pinfo = proc.as_dict(attrs=['pid', 'name', 'create_time'])

    os.kill(int(pinfo['pid']), signal.SIGTERM)  # or signal.SIGKILL
    process = subprocess.Popen("beam-wallet --wallet_path=\"wallet.db\" "
                    "-n eu-node01.masternet.beam.mw:8100 swap_coins "
                    "--amount " + amount_beam + " --fee 100 -r " + address +
                    " --pass=123 --swap_amount " + amount_btc +
                    " --swap_beam_side --btc_node_addr 127.0.0.1:13300 "
                    "--btc_pass 123 --btc_user Alice",
                    shell=True, stdin=None, stdout=None, stderr=None, close_fds=True)

    _redis.set("process_id", str(process.pid))
    return Response('Completed successfully', status=HTTP_200_OK)@api_view(['GET'])


@api_view(['GET'])
def tx_swap_by_api(request):
    port = request.GET['port']
    address = request.GET['address']
    amount_beam = request.GET['amount_beam']
    amount_btc = request.GET['amount_btc']
    fee = request.GET['fee']

    r = requests.post(WALLET_API_URL + '10000' + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 123,
                            'method': 'start_swap',
                            'params': {
                                'amount': int(amount_beam),
                                'fee': int(fee),
                                'swapAmount': int(amount_btc),
                                'beamSide': True,
                                'address': address
                            }})

    requests.post(WALLET_API_URL + '10001' + WALLET_API_PATH,
                  json={'jsonrpc': '2.0',
                        'id': 123,
                        'method': 'accept_swap',
                        'params': {
                            'amount': int(amount_beam),
                            'swapAmount': int(amount_btc),
                            'beamSide': False
                        }})
    result = json.loads(r.text)

    return Response('', status=HTTP_200_OK)


@api_view(['GET'])
def tx_swap_init(request):
    if not _redis.exists("initiated"):
        requests.post(WALLET_API_URL + '10000' + WALLET_API_PATH,
                          json={'jsonrpc': '2.0',
                                'id': 123,
                                'method': 'init_bitcoin',
                                'params': {
                                    'btcUserName': 'Alice',
                                    'btcPass': '123',
                                    'btcNodeAddr': '127.0.0.1:13300'
                                }})

        requests.post(WALLET_API_URL + '10001' + WALLET_API_PATH,
                          json={'jsonrpc': '2.0',
                                'id': 123,
                                'method': 'init_bitcoin',
                                'params': {
                                    'btcUserName': 'Bob',
                                    'btcPass': '123',
                                    'btcNodeAddr': '127.0.0.1:13400'
                                }})
        _redis.set('initiated', 1)

    return Response('', status=HTTP_200_OK)


@api_view(['GET'])
def tx_cancel(request):
    port = request.GET['port']
    tx_id = request.GET['tx_id']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 4,
                            'method': 'tx_cancel',
                            'params': {
                                'txId': tx_id
                            }})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)


@api_view(['GET'])
def tx_delete(request):
    port = request.GET['port']
    tx_id = request.GET['tx_id']
    r = requests.post(WALLET_API_URL + port + WALLET_API_PATH,
                      json={'jsonrpc': '2.0',
                            'id': 4,
                            'method': 'tx_delete',
                            'params': {
                                'txId': tx_id
                            }})
    result = json.loads(r.text)

    return Response(result['result'], status=HTTP_200_OK)
