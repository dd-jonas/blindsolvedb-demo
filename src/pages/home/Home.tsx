import '#styles/home/index.css';

import { TableIcon } from '@heroicons/react/outline';
import { AcademicCapIcon } from '@heroicons/react/solid';

import { Alert } from '#components';

import { HomeCard } from './HomeCard';
import { HomeFooter } from './HomeFooter';

const Home = () => {
  return (
    <>
      <Alert warning>
        This is a demo version of BlindsolveDB without server connection. A
        smaller set of data is provided for demonstration purposes only, and
        some features won&apos;t work.
      </Alert>

      <div className="home">
        <h1 className="home__title">
          Blindsolve<span>DB</span>
        </h1>

        <img
          className="home__image"
          src="/images/brand/rubik_flat_512x512.png"
          alt="Rubik's Cube"
        />

        <HomeCard title="Sheets" link="/sheets" icon={<TableIcon />}>
          <p>A collection of 3-style sets and algorithms.</p>
        </HomeCard>

        <HomeCard title="Trainer" link="/trainer" icon={<AcademicCapIcon />}>
          <p>Review your algorithms or learn new sets.</p>
        </HomeCard>
      </div>

      <HomeFooter />
    </>
  );
};

export default Home;
