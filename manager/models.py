from django.db import models
import datetime
import pytz


class Wallet(models.Model):
    port = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField(blank=False, null=False, max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def from_json(self, _json):
        self.port = _json['port']
        self.name = _json['name']
