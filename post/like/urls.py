from django.urls import path
from .views import *

urlpatterns = [
    path('', homeView, name='home'),
    path('createpost/', createPostView, name='createpost'),
    path('deletepost/', deletePostView, name='deletepost'),
    path('updatepost/', updatePostView, name='updatepost'),
    path('updatepostpost/', updatePostPostView, name='updatepostpost'),
    path('likepost/', likePostView, name='likepost'),
]