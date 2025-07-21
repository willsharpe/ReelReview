
import ReviewPageInfo from "@/app/components/ReviewPageInfo";
import NavBar from "@/app/components/NavBar";
import { Nabla } from "next/font/google";

interface PageProps {
  params: {
    id: string;
  };
}



 function MoviePage({ params }: PageProps)  {
  return(
    <>

        <ReviewPageInfo movieID={params.id} />
    </>

  );
}
export default MoviePage