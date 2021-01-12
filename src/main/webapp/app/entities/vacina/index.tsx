import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vacina from './vacina';
import VacinaDetail from './vacina-detail';
import VacinaUpdate from './vacina-update';
import VacinaDeleteDialog from './vacina-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VacinaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VacinaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VacinaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Vacina} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VacinaDeleteDialog} />
  </>
);

export default Routes;
