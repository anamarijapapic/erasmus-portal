const Hero = () => {
  return (
    <section className="bg-center bg-no-repeat bg-[url('./images/content/home-hero.jpg')] bg-gray-600 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Erasmus Portal:{' '}
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-yellow-500">
            Your Portal to the World
          </mark>{' '}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Welcome to the Erasmus Portal, your one-stop shop for all things
          related to Erasmus+ mobility programs. Whether you&apos;re a student,
          academic staff, or institution, we&apos;ve got you covered.
        </p>
      </div>
    </section>
  );
};

export default Hero;
