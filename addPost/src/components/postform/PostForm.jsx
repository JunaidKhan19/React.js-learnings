/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import { Input, Button, Select} from "../index";
import { useForm } from 'react-hook-form';
import databaseServices from '../../appwrite/database';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue} = useForm({
        defaultValues : {
            title : post?.title || '',
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth?.userData)

    const submit = async(data) => {
        const userId = userData?.userData?.$id;
        if (post){
            const file = data.image[0]? await databaseServices.uploadFile(data.image[0]) : null

            if (file) {
                databaseServices.deleteFile(post.image);
            }

            const dbPost = await databaseServices.updatePost(post.$id, {
                ...data, image: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await databaseServices.uploadFile(data.image[0]);

            if (file){
                const fileId = file.$id
                data.image = fileId
                const dbPost = await databaseServices.createPost({ ...data, userId : userId })
                
                if (dbPost) {
                    console.log("dbPost ID:", dbPost.$id);
                    console.log(dbPost.$id)
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string"){
            return value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        } else {
            return '';
        }
    })

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })
        return () => subscription.unsubscribe();
    }, [slugTransform, watch, setValue])

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input label="Title: " placeholder="Title" className='mb-4'
            {...register("title", {required : true})}
            />
            <Input label="Slug: " placeholder="Slug" className='mb-4'
            {...register("slug", {required : true})}
            onInput = {(e) => {
                setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate : true})
            }}
            />
            <textarea
                label="Content: "
                className="w-full mb-4 p-2 border rounded-md"
                placeholder="Content"
                {...register("content", {required: true})}
            />
        </div>
        <div className="w-1/3 px-2">
            <Input label="Featured Image: " type="file" className='mb-4'
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {required : !post})}
            />
            {post && 
                <div className="w-full mb-4">
                    <img
                        src= {post.image ? databaseServices.getFilePreview(String(post.image)) : null}
                        alt= {post.title}
                        className="rounded-lg"
                    />
                </div>
            }
            <Select 
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", {required : true})}
            />
            {post ? 
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                Update
            </Button> :
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                Submit
            </Button>
            }
        </div>
      </form>
    )
}

export default PostForm