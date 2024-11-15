import "@/css/route/singArticle.css";
import ArticleImageSlider from "@/components/ArticleImageSlider";
import { fetchApi } from "@/api/fetchApi";

type id = {
  params: Promise<{
    id: string;
  }>;
};

async function ArticlePage(props: id) {
  const params = await props.params;
  const [articleData, wilayaList]: any = await Promise.allSettled([
    fetchApi(`article/${params.id}`),
    fetchApi("shipping/available"),
  ]);

  return (
    <section className="wraper">
      <ArticleImageSlider imageUrlList={articleData.img_url} />
    </section>
  );
}

export default ArticlePage;
