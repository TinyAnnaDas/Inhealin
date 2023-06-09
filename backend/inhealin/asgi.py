import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import cadmin.routing
from channels.auth import AuthMiddlewareStack


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inhealin.settings')

application = ProtocolTypeRouter({
     "http": get_asgi_application(),

     'websocket': AuthMiddlewareStack(
         URLRouter(
         cadmin.routing.websocket_urlpatterns
       )
      )

})


