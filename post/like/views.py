from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Post
from .forms import PostForm

import json

def homeView(request):
    form = PostForm
    posts = Post.objects.all()
    posts = Post.objects.all()[::-1]
    context = {
        'form' : form,
        'posts' : posts
    }
    return render(request, 'like/index.html', context)

def createPostView(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid:
            npost = form.save()
  
            #npost = Post.objects.all().last()
            cid = npost.id
            ctext = npost.post_text
            cimg = npost.post_img

            if cimg:
                cimg = cimg.url
            else:
                cimg = ""

            context = {'cid':cid, 'ctext':ctext, 'cimg':cimg}
            return JsonResponse(context)

def deletePostView(request):
    if request.method == "POST":
        id = request.POST['did']
        post = Post.objects.get(pk=id)
        post.delete()
        return HttpResponse()
#passes references in form to update post
def updatePostView(request):
    if request.method == "POST":
        id = request.POST['uid']
        post = Post.objects.get(id=id)
        postid = post.id
        post_text = post.post_text
        post_img = post.post_img
        if not post_img:
            post_img=""
        else:
            post_img = post_img.url

        context = {"postid":postid, "post_text":post_text, "post_img":post_img}
        return JsonResponse(context)
#updates data
def updatePostPostView(request):
    if request.method == "POST":
        uid = request.POST["postid"]
        ints = Post.objects.get(id=uid)
        form = PostForm(request.POST, request.FILES, instance=ints)

        if form.is_valid():
            form.save()
            updatepost = Post.objects.get(id=uid)

            utext = updatepost.post_text
            uimg = ""
            ulike = "" 
            if updatepost.like:
                ulike = "True"

            #imgsrc = request.POST['imgsrc']
            #updates only post_text, when post_img empty and stays empty
            if updatepost.post_img == "":
                context = {'uid':uid, 'utext':utext, 'uimg':uimg, "ulike":ulike}
                return JsonResponse(context)
            #updates post_text and assigns post_img  
            if updatepost.post_img.url:
                uimg = updatepost.post_img.url
                updatepost.save()
                context = {'uid':uid, 'utext':utext, 'uimg':uimg, "ulike":ulike}
                return JsonResponse(context)
            """
            #assigns same image to ImageField
            if imgsrc != "":
                print("3")

                updatepost.post_img = imgsrc[6:]
                uimg = updatepost.post_img.url
                updatepost.save()
            else:
                uimg = ""
            updatepost.save()

            context = {'uid':uid, 'utext':utext, 'uimg':uimg, "ulike":ulike}
            return JsonResponse(context)
            """
       
def likePostView(request):
    if request.method == "POST":
        postid = request.POST['lid']
        post = Post.objects.get(id=postid)
        like=""
        if post.like != True:
            post.like = True
            like = "True"
        else:
            post.like = False
        post.save()
        return JsonResponse({"like" : like})