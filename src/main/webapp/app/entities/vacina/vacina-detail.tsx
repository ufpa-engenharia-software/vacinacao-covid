import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vacina.reducer';
import { IVacina } from 'app/shared/model/vacina.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVacinaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VacinaDetail = (props: IVacinaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vacinaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="vacinacaoCovidApp.vacina.detail.title">Vacina</Translate> [<b>{vacinaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">
              <Translate contentKey="vacinacaoCovidApp.vacina.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{vacinaEntity.nome}</dd>
          <dt>
            <span id="fabricante">
              <Translate contentKey="vacinacaoCovidApp.vacina.fabricante">Fabricante</Translate>
            </span>
          </dt>
          <dd>{vacinaEntity.fabricante}</dd>
        </dl>
        <Button tag={Link} to="/vacina" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vacina/${vacinaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vacina }: IRootState) => ({
  vacinaEntity: vacina.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VacinaDetail);
