from django.shortcuts import get_object_or_404
from rest_framework import routers, serializers, viewsets
from rest_framework.response import Response

from .base.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializers define the API representation.
    '''
    class Meta:
        model = User
        fields = (
            'url',
            'id',
            'username',
            'email',
            'is_staff',
            'is_superuser',
            'first_name',
            'last_name',
            'iban',
            'creator',
        )


class UserViewSet(viewsets.ModelViewSet):
    '''
    ViewSets define the view behavior.
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
