import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVacina } from 'app/shared/model/vacina.model';
import { getEntities as getVacinas } from 'app/entities/vacina/vacina.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPessoaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaUpdate = (props: IPessoaUpdateProps) => {
  const [vacinaId, setVacinaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pessoaEntity, vacinas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pessoa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVacinas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.cadastro = convertDateTimeToServer(values.cadastro);

    if (errors.length === 0) {
      const entity = {
        ...pessoaEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vacinacaoCovidApp.pessoa.home.createOrEditLabel">
            <Translate contentKey="vacinacaoCovidApp.pessoa.home.createOrEditLabel">Create or edit a Pessoa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pessoaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pessoa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pessoa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="pessoa-nome">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.nome">Nome</Translate>
                </Label>
                <AvField id="pessoa-nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="nascimentoLabel" for="pessoa-nascimento">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.nascimento">Nascimento</Translate>
                </Label>
                <AvField id="pessoa-nascimento" type="date" className="form-control" name="nascimento" />
              </AvGroup>
              <AvGroup>
                <Label id="cadastroLabel" for="pessoa-cadastro">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.cadastro">Cadastro</Translate>
                </Label>
                <AvInput
                  id="pessoa-cadastro"
                  type="datetime-local"
                  className="form-control"
                  name="cadastro"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.pessoaEntity.cadastro)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dose1Label" for="pessoa-dose1">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.dose1">Dose 1</Translate>
                </Label>
                <AvField id="pessoa-dose1" type="date" className="form-control" name="dose1" />
              </AvGroup>
              <AvGroup>
                <Label id="dose2Label" for="pessoa-dose2">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.dose2">Dose 2</Translate>
                </Label>
                <AvField id="pessoa-dose2" type="date" className="form-control" name="dose2" />
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-vacina">
                  <Translate contentKey="vacinacaoCovidApp.pessoa.vacina">Vacina</Translate>
                </Label>
                <AvInput id="pessoa-vacina" type="select" className="form-control" name="vacina.id">
                  <option value="" key="0" />
                  {vacinas
                    ? vacinas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nome}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pessoa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vacinas: storeState.vacina.entities,
  pessoaEntity: storeState.pessoa.entity,
  loading: storeState.pessoa.loading,
  updating: storeState.pessoa.updating,
  updateSuccess: storeState.pessoa.updateSuccess,
});

const mapDispatchToProps = {
  getVacinas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaUpdate);
