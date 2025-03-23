import Pixel from "@/components/Pixel";
import "@/css/route/singArticle.css";

type id = {
  params: Promise<{
    id: string;
  }>;
};

async function ArticlePage(props: id) {
  // const params = await props.params;
  // const [articleData, wilayaList]: any = await Promise.allSettled([
  //   fetchApi(`article/${params.id}`),
  //   fetchApi("shipping/available"),
  // ]);

  return (
    <>
      <Pixel />
      <section className="wraper">
        {/* <ArticleImageSlider imageUrlList={articleData.img_url} /> */}
      </section>
    </>
  );
}

export default ArticlePage;
