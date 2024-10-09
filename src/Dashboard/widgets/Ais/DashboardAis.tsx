import React from 'react';
import { RouteNamesEnum } from '../../../../localConstants';
import { MxLink } from '../../../../components';

export const DashboardAis = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <img src='/ais.jpg'
                       style={{ width: '100%', height: '40%', marginLeft: 'auto', marginRight: 'auto' }}
                       alt="ais">
                  </img>
                  <button
                    type='button'
                    className='special-button justify-content-center mt-5'
                  >
                    <MxLink
                      className='flex items-center justify-between'
                      to={RouteNamesEnum.ais}
                    >
                      Access AIS
                    </MxLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
