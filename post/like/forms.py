from django import forms 
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post_text', 'post_img']
        widgets = {
            'post_text' : forms.TextInput(attrs={
                'id' : 'post_text',
                'required' : True,
                'placeholder' : 'Write Something..',
            }),
            'post_img' : forms.FileInput(attrs={
                'id' : 'post_img',
                'required' : False,
            })
        }