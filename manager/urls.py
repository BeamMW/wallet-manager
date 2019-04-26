from django.conf.urls import url, include
from rest_framework import routers
from .views import *
from manager import views

router = routers.DefaultRouter()
router.register(r'wallets', views.WalletViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^create_address/$', create_address),
    url(r'^wallet_status/$', get_wallet_status),
    url(r'^tx_list/$', get_tx_list),
    url(r'^tx_send/$', tx_send),
    url(r'^tx_swap/$', tx_swap),
    url(r'^tx_cancel/$', tx_cancel),
    url(r'^tx_delete/$', tx_delete),
    url(r'^get_utxo/$', get_utxo),
    url(r'^get_addr_list/$', get_addr_list),
    url(r'^edit_address/$', edit_address),
    url(r'^delete_address/$', delete_address),
    url(r'^get_contacts_list/$', get_contacts_list),
    url(r'^', include(router.urls)),
]
