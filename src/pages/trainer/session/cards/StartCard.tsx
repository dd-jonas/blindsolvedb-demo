import { NextButton } from '../actions/NextButton';

export const StartCard = () => {
  return (
    <>
      <div className="trainer__card trainer__card--start">
        <img src="/images/brand/rubik_flat_512x512.png" alt="Rubik's Cube" />

        <div>
          <h3>Shortcuts</h3>
          <ul>
            <li>
              <kbd>Space</kbd> : Next card
            </li>
            <li>
              <kbd>Enter</kbd> : Flip card
            </li>
            <li>
              <kbd>g</kbd> / <kbd>s</kbd> / <kbd>f</kbd> / <kbd>r</kbd> : Good /
              Slow / Failed / Retry
            </li>
          </ul>

          <h3>Results</h3>
          <ul>
            <li>
              <strong>Good:</strong> Fast recognition and smooth execution.
            </li>
            <li>
              <strong>Slow:</strong> Slow recognition or bad execution.
            </li>
            <li>
              <strong>Failed:</strong> Forgot the algorithm or wrong execution.
            </li>
            <li>
              <strong>Retry:</strong> Got distracted? Ignore the result and try
              again.
            </li>
          </ul>

          <h3>Tips</h3>
          <ul>
            <li>Solve the cube after stopping the timer.</li>
            <li>Always start from and return to home grip (thumbs on F).</li>
          </ul>
        </div>
      </div>

      <NextButton />
    </>
  );
};
