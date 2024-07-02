import { itemRequestUrlInterceptor } from './interceptors/itemRequestUrlInterceptor';
import { configureInterceptors } from './interceptors/config';

// Components
import { prmTopBarBefore } from './components/prmTopBarBefore';
import { prmSearchResultThumbnailContainerAfter } from './components/prmSearchResultThumbnailContainerAfter';
import { prmSearchBookmarkFilterAfter } from './components/prmSearchBookmarkFilterAfter';
import { prmLocationAfter } from './components/prmLocationAfter';
// import { prmLocationHoldingsAfter } from './components/prmLocationHoldingsAfter';
import { prmAuthenticationAfter } from './components/prmAuthenticationAfter';
import { prmLocationItemsAfter } from './components/prmLocationItemsAfter';
import { prmRequestAfter } from './components/prmRequestAfter';

// Services
import { AuthService } from './services/AuthService';
import { CapitalizeService } from './services/CapitalizeService';
import { primawsRest } from './services/primawsRest';

const app = angular.module('viewCustom', ['angularLoad']);

app.factory('itemRequestUrlInterceptor', itemRequestUrlInterceptor);

configureInterceptors(app);

app.component('prmTopBarBefore', prmTopBarBefore);
app.component('prmSearchResultThumbnailContainerAfter', prmSearchResultThumbnailContainerAfter);
app.component('prmSearchBookmarkFilterAfter', prmSearchBookmarkFilterAfter);
app.component('prmLocationAfter', prmLocationAfter);
//app.component('prmLocationHoldingsAfter', prmLocationHoldingsAfter);
app.component('prmAuthenticationAfter', prmAuthenticationAfter);
app.component('prmLocationItemsAfter', prmLocationItemsAfter);
app.component('prmRequestAfter', prmRequestAfter);

app.service('AuthService', AuthService);
app.service('CapitalizeService', CapitalizeService);
app.service('primawsRest', primawsRest);

export default app;
