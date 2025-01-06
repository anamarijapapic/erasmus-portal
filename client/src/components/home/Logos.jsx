const Logos = () => {
  return (
    <section className="bg-gray-200 dark:bg-gray-600">
      <div className="px-4 mx-auto py-8 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        <span className="font-semibold text-gray-400 uppercase">
          POWERED BY
        </span>
        <div className="flex flex-wrap justify-around items-center mt-8 text-gray-500">
          <a
            href="#"
            className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
          >
            <img
              src="/images/content/unist-logo.jpg"
              alt="University of Split"
              width={120}
            />
          </a>
          <a
            href="#"
            className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
          >
            <img
              src="/images/content/eu-logo.jpg"
              alt="European Union"
              width={80}
            />
          </a>
          <a
            href="#"
            className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
          >
            <img
              src="/images/content/ec-logo.svg"
              alt="European Commission"
              width={250}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Logos;
