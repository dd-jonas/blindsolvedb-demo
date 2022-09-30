import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';

import { Message } from '#components';

import { NextButton } from '../actions/NextButton';
import { useTrainerContext } from '../TrainerProvider';

export const EndCard = () => {
  const { results } = useTrainerContext();

  return (
    <>
      <div className="trainer__card trainer__card--end">
        <p>Session results</p>

        {results.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Time</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {results.map(({ prompt, status, time }, i) => (
                <tr key={i}>
                  <td>{prompt}</td>
                  <td>{time.toFixed(2)}s</td>
                  <td className={`result--${status}`}>
                    {status === 'good' ? (
                      <>
                        <ChevronDoubleUpIcon /> Good
                      </>
                    ) : status === 'slow' ? (
                      <>
                        <ChevronDownIcon /> Slow
                      </>
                    ) : (
                      <>
                        <ChevronDoubleDownIcon /> Failed
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <img
              src="/images/brand/rubik_flat_512x512_sad.png"
              alt="Rubik's Cube"
            />
            <Message>No algorithms were reviewed.</Message>
          </>
        )}
      </div>

      <NextButton />
    </>
  );
};
