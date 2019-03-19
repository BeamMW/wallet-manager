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
    url(r'^get_utxo/$', get_utxo),
    url(r'^', include(router.urls)),
]
