import * as React from 'react';
import { contractAddress } from 'config';
import { useGetAccountInfo } from 'hooks';

export const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  // The data/time we want to count down to
  const countDownDate = new Date('October 24, 2024 16:00:00').getTime();

  // Run myfunc every second
  const myfunc = setInterval(function () {
    const now = new Date().getTime();
    const timezone = new Date().getTimezoneOffset();
    const timeleft = countDownDate - timezone * 60 * 1000 - now;

    // Calculating the days, hours, minutes and seconds left
    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('days').innerHTML = days + 'd ';
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('hours').innerHTML = hours + 'h ';
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('mins').innerHTML = minutes + 'm ';
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('secs').innerHTML = seconds + 's ';
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('message').innerHTML = 'Time left to activate your rewards: ';

    // Display the message when countdown is over
    if (timeleft < 0) {
      clearInterval(myfunc);
      // eslint-disable-next-line
      // @ts-ignore
      document.getElementById('days').innerHTML = '';
      // eslint-disable-next-line
      // @ts-ignore
      document.getElementById('hours').innerHTML = '';
      // eslint-disable-next-line
      // @ts-ignore
      document.getElementById('mins').innerHTML = '';
      // eslint-disable-next-line
      // @ts-ignore
      document.getElementById('secs').innerHTML = '';
      // eslint-disable-next-line
      // @ts-ignore
      document.getElementById('message').innerHTML = 'Claim ended.';
    }
  }, 1000);

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-4 py-2'>
        <span className='opacity-6 mr-1'>AIS is registered on address:</span>
        <p style={{wordBreak: 'break-all', marginTop: '20px'}} data-testid='contractAddress'>
          <a href={'https://explorer.multiversx.com/accounts/' + contractAddress} target='_blank'>{contractAddress}</a>
        </p>
      </div>
      <br />
      <br />
      <hr />
      <div>
        <h3 className='py-2'>
          <p><b>AIS - Hypey collection (<a href='https://explorer.multiversx.com/collections/HYPEY-794a10' target='_blank'>HYPEY-794a10</a>)</b></p>
          <p><b>AIS - HYPEDAF collection (<a href='https://explorer.multiversx.com/collections/HYPEDAF-9378b5' target='_blank'>HYPEDAF-9378b5</a>)</b></p>
          <br />
          <img src='/ais.jpg' style={{width: '100%', height: '40%', marginLeft: 'auto', marginRight: 'auto'}} alt="hypey"></img>
        </h3>
        <br />
        <h4>
          <span id='message' />
          <span id='days' />
          <span id='hours' />
          <span id='mins' />
          <span id='secs' />
        </h4>
      </div>
      <hr />
      <br />
      <br />
    </div>
  );
};
