import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <section className="not-found">
      <img
        src="/images/brand/rubik_flat_512x512_sad.png"
        alt="Rubik's Cube"
        className="not-found__image"
      />

      <div className="not-found__message">
        <strong>Not found</strong>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Back to homepage</Link>
      </div>
    </section>
  );
};
