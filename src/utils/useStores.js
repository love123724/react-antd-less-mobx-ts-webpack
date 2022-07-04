import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export default function useStores(name) {
    return React.useContext(MobXProviderContext)[name]
}