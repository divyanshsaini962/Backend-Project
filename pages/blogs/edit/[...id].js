import Blog from "@/components/Blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs"; // Assuming this is the correct icon import
import Loading from "@/components/Loading"; // Make sure Loading component is correctly imported

export default function EditBlog() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status !== "loading") {
            router.push('/login');
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="loadingdata flex flex-col flex-center wh_100">
                <Loading />
                <h1>Loading ....</h1>
            </div>
        );
    }

    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/api/blogapi?id=' + id).then(response => {
                setProductInfo(response.data);
            });
        }
    }, [id]);

    if (session) {
        return (
            <>
                <Head>
                    <title>Update Blog</title>
                </Head>
                <div className="blogpage">
                    <div className="titledashboard flex flex-sb">
                        <div>
                            <h2>Edit <span>Blog</span></h2>
                            <h3>ADMIN PANEL</h3>
                        </div>
                        <div className="breadcrumb">
                            <BsPostcard /> <span>/</span> <span>Edit Blog</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        {productInfo && <Blog {...productInfo} />}
                    </div>
                </div>
            </>
        );
    }

    return null; // Return null instead of an empty fragment if the user is not authenticated
}
