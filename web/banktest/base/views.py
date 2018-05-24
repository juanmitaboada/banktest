from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from django.utils.decorators import method_decorator


class Home(View):
    template = "base/home.html"

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, self.template, context)
