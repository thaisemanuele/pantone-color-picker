type ContrastingImageType = {
  author: string;
  authorUrl: string;
  url: string;
  name: string;
};

const ContrastingImage = (contrastImage: ContrastingImageType) => {
  return (
    <figure>
      <img
        src={contrastImage.url}
        alt={`Good contrasting color (${contrastImage.name}) by ${contrastImage.author}`}
      />
      <figcaption>
        Good contrasting color ({contrastImage.name}) by{" "}
        <a href={contrastImage.authorUrl} target="_blank">
          {contrastImage.author}
        </a>{" "}
        on Pexels
      </figcaption>
    </figure>
  );
};

export default ContrastingImage;
