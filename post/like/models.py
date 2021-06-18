from django.db import models

class Post(models.Model):
    post_text = models.TextField(max_length=50)
    post_img = models.ImageField(upload_to="images/", null=True, blank=True)
    like = models.BooleanField(default=False)

    def __str__(self):
        return self.post_text