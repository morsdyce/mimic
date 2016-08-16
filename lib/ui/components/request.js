import 'ui/assets/stylesheets/components/request.scss';
import React from 'react';

function mockedState(mocked) {
  return (
    <span style={{ position: 'relative'}}>
      { mocked ? (
          <div style={{ background: '#03A9F4', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', position: 'relative', margin: '10px 0 0', float: 'right', clear: 'both'}}>
            <span style={{ position: 'absolute', top: '5px', left: '8px'}}>M</span>
          </div>
      ) : null }

    </span>
  );
}

export const Request = ({ url, method, params, mocked, handleClick}) => (
  <div onClick={ handleClick } className="cursor-pointer request" style={{ position: 'relative', padding: '0 10px 15px' }}>

    <div className="row middle-xs">
      <div className="col-xs-2" style={{ fontSize: '14px'}}>
        {method}
      </div>
      <div className="col-xs-2 col-xs-offset-8 end-xs">
        { mockedState(mocked) }
      </div>
    </div>
    <div className="row">
      <div className="col-xs">
        <span style={{ wordBreak: 'break-word'}}>{url}</span>
      </div>
    </div>
    <div className="row" style={{ color: '#8D8E8E'}}>
      <div className="col-xs">
        {params}
      </div>
    </div>
  </div>
);
