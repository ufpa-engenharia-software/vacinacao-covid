import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPessoaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaDetail = (props: IPessoaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pessoaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="vacinacaoCovidApp.pessoa.detail.title">Pessoa</Translate> [<b>{pessoaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">
              <Translate contentKey="vacinacaoCovidApp.pessoa.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.nome}</dd>
          <dt>
            <span id="nascimento">
              <Translate contentKey="vacinacaoCovidApp.pessoa.nascimento">Nascimento</Translate>
            </span>
          </dt>
          <dd>
            {pessoaEntity.nascimento ? <TextFormat value={pessoaEntity.nascimento} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="cadastro">
              <Translate contentKey="vacinacaoCovidApp.pessoa.cadastro">Cadastro</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.cadastro ? <TextFormat value={pessoaEntity.cadastro} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dose1">
              <Translate contentKey="vacinacaoCovidApp.pessoa.dose1">Dose 1</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.dose1 ? <TextFormat value={pessoaEntity.dose1} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dose2">
              <Translate contentKey="vacinacaoCovidApp.pessoa.dose2">Dose 2</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.dose2 ? <TextFormat value={pessoaEntity.dose2} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="vacinacaoCovidApp.pessoa.vacina">Vacina</Translate>
          </dt>
          <dd>{pessoaEntity.vacina ? pessoaEntity.vacina.nome : ''}</dd>
        </dl>
        <Button tag={Link} to="/pessoa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pessoa/${pessoaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pessoa }: IRootState) => ({
  pessoaEntity: pessoa.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaDetail);
