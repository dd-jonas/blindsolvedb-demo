export const HomeFooter = () => {
  return (
    <footer className="home-footer">
      <div>
        <h6>Contact</h6>
        <a href="mailto:blindsolvedb@gmail.com">blindsolvedb@gmail.com</a>
      </div>

      <div>
        <h6>Credits</h6>
        <a
          href="https://www.flaticon.com/authors/freepik"
          target="_blank"
          title="cube icons"
          rel="noreferrer"
        >
          Cube icons created by Freepik - Flaticon
        </a>
      </div>

      <div>
        <h6>Donate</h6>
        <a
          className="button button--primary button--small"
          href="https://www.buymeacoffee.com/blindsolvedb"
          target="_blank"
          rel="noreferrer"
        >
          ☕ Buy me a coffee
        </a>
      </div>

      <div>
        <p>
          &copy; BlindsolveDB {new Date().getFullYear()} – All rights reserved
        </p>
      </div>
    </footer>
  );
};
