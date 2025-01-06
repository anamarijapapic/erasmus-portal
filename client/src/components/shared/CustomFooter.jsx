import { Footer } from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';

const CustomFooter = () => {
  return (
    <Footer className="rounded-none">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Authors" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://github.com/Tea27">
                Tea Bašić
              </Footer.Link>
              <Footer.Link href="https://github.com/imihanovic">
                Ivana Mihanović
              </Footer.Link>
              <Footer.Link href="https://github.com/anamarijapapic">
                Anamarija Papić
              </Footer.Link>
              <Footer.Link href="https://github.com/Petar1107">
                Petar Vidović
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Erasmus Portal" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://github.com/anamarijapapic/erasmus-portal"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
