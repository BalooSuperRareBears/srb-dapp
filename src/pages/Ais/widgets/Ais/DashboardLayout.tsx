import React, { useState } from 'react';
import data from './../../../../assets/data/wallets-hypey.json';
import { Actions } from './Actions';
import { TopInfo } from './TopInfo';
import { useGetAccount } from '../../../../hooks';

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { address } = useGetAccount();
  // eslint-disable-next-line
  // @ts-ignore
  const [date, setDate] = useState(address in data ? data[address]['date'] : '');
  // @ts-ignore
  const [normalNfts, setNormalNfts] = useState(address in data ? data[address]['normal'] : 0);
  // @ts-ignore
  const [zombieNfts, setZombieNfts] = useState(address in data ? data[address]['zombie'] : 0);

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <hr />
          {date ? (
            <>
              <h2 className='text-center justify-content-center text-white'>
                <b>Snapshot date {date} UTC</b>
              </h2>
              <h2 className='text-center justify-content-center text-white'>
                <b>You are eligible with {normalNfts} Hypey NFTs</b>
              </h2>
              <h2 className='text-center justify-content-center text-white'>
                <b>You are eligible with {zombieNfts} HYPED AF NFTs</b>
              </h2>
            </>
          ) : (
            <h2 className='text-center justify-content-center text-white'>
              <b>You don't have any Hypey or HYPED AF NFTs</b>
            </h2>
          )}
          <hr/>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
