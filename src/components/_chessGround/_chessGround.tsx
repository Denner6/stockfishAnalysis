// You can find this code at https://github.com/react-chess/chessground/blob/main/src/index.tsx

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Chessground as ChessgroundApi } from 'chessground';

import { Api } from 'chessground/api';
import { Config } from 'chessground/config';
import CgResize from './_cgResize';

interface Props {
  width?: number
  height?: number
  contained?: boolean;
  config?: Config
}

function Chessground({
    width = 900, height = 900, config = {}
    }: Props) {

    const [api, setApi] = useState<Api | null>(null);
    
    const chessGroundRef = useRef<HTMLDivElement>(null);
    
    const [domReady, setDomReady] = useState(false) ;

    useEffect(() => {
        if (chessGroundRef && chessGroundRef.current && !api) {
          const chessgroundApi = ChessgroundApi(chessGroundRef.current, {
            animation: { enabled: true, duration: 200 },
            ...config,
          });
          setApi(chessgroundApi);
        } else if (chessGroundRef && chessGroundRef.current && api) {
            api.set(config);
        }
    }, [chessGroundRef]);

    useEffect(() => {
        api?.set(config);
        setDomReady(true);
    }, [api, config]);

    return (
        <div style={{ height, width }} className="board-container">
            <div ref={chessGroundRef} style={{ height: '100%', width: '100%', display: 'table' }} />           
            { 
                domReady ?
                    ReactDOM.createPortal(
                        <CgResize />,
                        chessGroundRef.current?.querySelector("cg-container")
                    ) : null
            }
        </div>

    );
}

export { Chessground as default };

