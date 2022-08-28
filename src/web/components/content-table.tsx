import React, { ComponentState, useState } from 'react';
import { Signature } from '../../meta';

export interface ContentTableState extends ComponentState {
    signatures: Signature[];
    filter: string;
    onClick: Function;
    hidden?: boolean;
}

function renderSignatures({ signatures, filter, onClick }: ContentTableState) {
    return (
        <ul className='first'>
            {
                signatures.map((item, index) => {
                    let intrinsics = Object.keys(item.definitions);

                    if (filter !== '') {
                        intrinsics = intrinsics.filter((methodName) => {
                            const pattern = new RegExp(filter, 'i');
                            return pattern.test(`${item.type}.${methodName}`);
                        });
                    }

                    if (intrinsics.length === 0) {
                        return;
                    }

                    return (
                        <li key={index}>
                            <a href={`#${item.type.toUpperCase()}`} onClick={() => onClick(item.type)}>{item.type}</a>
                            <ul className='second'>
                                {
                                    intrinsics.map((methodName: string, subIndex: number) => {
                                        const key = `${item.type.toUpperCase()}_${methodName.toUpperCase()}`;
                                        return (
                                            <li key={subIndex}>
                                                <a href={`#${key}`} onClick={() => onClick(`${item.type}.${methodName}`)}>{methodName}</a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default function(state: ContentTableState) {
    const initHidden = state.hidden || true;
    const [hidden, setHidden] = useState<boolean>(initHidden);

    return (
        <div className='content-table'>
            <a className={`collapse material-icons ${!hidden ? 'active' : ''}`} onClick={() => setHidden(hidden ? false : true)}></a>
            <div className={hidden ? 'hidden' : ''}>{renderSignatures(state)}</div>       
        </div>
    );
}