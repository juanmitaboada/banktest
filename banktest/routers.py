from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from rest_framework import routers, serializers, viewsets

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
            'password',
        )

    def create(self, validated_data):
        # Do as usually
        user = super().create(validated_data)

        # Set password
        if 'password' in validated_data:
            user.set_password(validated_data['password'])

        # Set owner
        if isinstance(self.context['request'].user, AnonymousUser):
            if settings.EXTERNAL_APP:
                creator = User.objects.filter(is_superuser=True).first()
            else:
                creator = None
        else:
            creator = self.context['request'].user

        if creator:
            user.creator=creator

        # Save model
        user.save()

        # Return final user created
        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
            user.save()
        return user


class UserNoPasswordSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
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
        )


class UserViewSet(viewsets.ModelViewSet):
    '''
    ViewSets define the view behavior.
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        qs = super(UserViewSet, self).get_queryset()
        if isinstance(self.request.user, AnonymousUser):
            if settings.EXTERNAL_APP:
                user = User.objects.first()
            else:
                user = None
        else:
            user = self.request.user
        if not user.is_superuser:
            qs = qs.filter(creator=user)
        return qs

    def get_serializer_class(self):
        if self.request.data and 'password' not in self.request.data:
            return UserNoPasswordSerializer
        else:
            if self.action in ['list', 'retrieve']:
                return UserNoPasswordSerializer
            else:
                return UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
