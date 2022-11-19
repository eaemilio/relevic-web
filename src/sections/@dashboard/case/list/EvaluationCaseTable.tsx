import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Label from 'src/components/Label';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { useTheme } from '@mui/material/styles';
import { UserManager } from 'src/@types/user';
import { RHFCheckbox, RHFSelect } from 'src/components/hook-form';
import { NetworkCase } from 'src/@types/case';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';

const TABLE_HEAD = [
  { id: 'description', label: 'Evaluación', align: 'left' },
  { id: 'userInCharge', label: 'Responsable', align: 'left' },
  { id: 'completed', label: 'Estado', align: 'left' },
  { id: 'actions', label: '', align: 'right', width: 200 },
];

function EvaluationCaseTable({
  providerContacts,
  currentCase,
  onDemographicClick,
  onInitialSurvivorEvaluationClick,
  onFinalSurvivorEvaluationClick,
  onPostSurvivorEvaluationClick,
  onAttentionProtocolClick,
  disabled = false,
}: {
  providerContacts: UserManager[];
  currentCase?: NetworkCase;
  onDemographicClick: () => void;
  onInitialSurvivorEvaluationClick: () => void;
  onFinalSurvivorEvaluationClick: () => void;
  onPostSurvivorEvaluationClick: () => void;
  onAttentionProtocolClick: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();
  const { order, orderBy, onSort } = useTable();
  const navigate = useNavigate();

  const download = (adult: boolean) => {
    var link = document.createElement('a');
    link.href = adult ? '/assets/adult_consent.pdf' : '/assets/nna_consent.pdf';
    link.download = `Formulario de Consentimiento Informado ${adult ? 'ADULTOS' : 'NNA'}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <>
      <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
        <Table size={'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={6}
            onSort={onSort}
          />
          <TableBody>
            <TableRow hover key={0}>
              <TableCell align="left">
                Obtener CONSENTIMIENTO INFORMADO del sobreviviente (o tutor, en casos de menores de
                edad) antes de administrar cualquier servicio no crítico.
              </TableCell>
              <TableCell align="left">
                <RHFSelect name="consentUserInChargeId" label="Responsable" disabled={disabled}>
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <RHFCheckbox
                  name="consent"
                  label="Realizado?"
                  sx={{ mt: 3 }}
                  disabled={currentCase?.inactive || currentCase?.completed}
                />
              </TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={() => download(true)}>
                  Descargar Consentimiento Adulto
                </Button>
                <Button variant="text" onClick={() => download(false)}>
                  Descargar Consentimiento NNA
                </Button>
              </TableCell>
            </TableRow>

            <TableRow hover key={1}>
              <TableCell align="left">
                Completar un FORMULARIO DEMOGRÁFICO para recolectar la información básica del
                sobreviviente.
              </TableCell>
              <TableCell align="left">
                <RHFSelect
                  name="demographicForm.userInChargeId"
                  label="Responsable"
                  disabled={disabled}
                >
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={currentCase?.demographicForm?.completed ? 'success' : 'error'}
                >
                  {currentCase?.demographicForm?.completed ? 'Completado' : 'Pendiente'}
                </Label>
              </TableCell>
              <TableCell align="center">
                {currentCase && (
                  <Button variant="text" onClick={onDemographicClick}>
                    Ver Formulario
                  </Button>
                )}
              </TableCell>
            </TableRow>

            <TableRow hover key={2}>
              <TableCell align="left">
                Realizar una EVALUACIÓN DEL SOBREVIVIENTE (ESO) inicial. Nota: debe pasar dentro del
                primer mes de un caso nuevo
              </TableCell>
              <TableCell align="left">
                <RHFSelect
                  name="initialSurvivorEvaluation.userInChargeId"
                  label="Responsable"
                  disabled={disabled}
                >
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={currentCase?.initialSurvivorEvaluation?.completed ? 'success' : 'error'}
                >
                  {currentCase?.initialSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
                </Label>
              </TableCell>
              <TableCell align="center">
                {currentCase && (
                  <Button variant="text" onClick={onInitialSurvivorEvaluationClick}>
                    Ver Formulario
                  </Button>
                )}
              </TableCell>
            </TableRow>

            <TableRow hover key={3}>
              <TableCell align="left">
                Elaborar un PROTOCOLO DE ATENCIÓN para el/la sobreviviente, orientado especialmente
                a las áreas prioritarias reveladas por la primera ESO.
              </TableCell>
              <TableCell align="left">
                <RHFSelect
                  name="attentionProtocol.userInChargeId"
                  label="Responsable"
                  disabled={disabled}
                >
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={currentCase?.attentionProtocol?.completed ? 'success' : 'error'}
                >
                  {currentCase?.attentionProtocol?.completed ? 'Completado' : 'Pendiente'}
                </Label>
              </TableCell>
              <TableCell align="center">
                {currentCase && (
                  <Button variant="text" onClick={onAttentionProtocolClick}>
                    Ver Formulario
                  </Button>
                )}
              </TableCell>
            </TableRow>

            <TableRow hover key={4}>
              <TableCell align="left">Se debe realizar una ESO final al cierre del caso.</TableCell>
              <TableCell align="left">
                <RHFSelect
                  name="finalSurvivorEvaluation.userInChargeId"
                  label="Responsable"
                  type="number"
                  disabled={disabled}
                >
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={currentCase?.finalSurvivorEvaluation?.completed ? 'success' : 'error'}
                >
                  {currentCase?.finalSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
                </Label>
              </TableCell>
              <TableCell align="center">
                {currentCase && (
                  <Button variant="text" onClick={onFinalSurvivorEvaluationClick}>
                    Ver Formulario
                  </Button>
                )}
              </TableCell>
            </TableRow>

            <TableRow hover key={5}>
              <TableCell align="left">
                A un año luego del cierre del caso, se debe realizar una ESO para ver si la
                restauración se ha sostenido.
              </TableCell>
              <TableCell align="left">
                <RHFSelect
                  name="postSurvivorEvaluation.userInChargeId"
                  label="Responsable"
                  disabled={disabled}
                >
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={currentCase?.postSurvivorEvaluation?.completed ? 'success' : 'error'}
                >
                  {currentCase?.postSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
                </Label>
              </TableCell>
              <TableCell align="center">
                {currentCase && (
                  <Button variant="text" onClick={onPostSurvivorEvaluationClick}>
                    Ver Formulario
                  </Button>
                )}
              </TableCell>
            </TableRow>

            <TableRow hover key={6}>
              <TableCell align="left" sx={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                Se deben realizar NOTAS DE SEGUIMIENTO luego de cada visita/contacto con el/la
                sobreviviente.
              </TableCell>
              <TableCell align="left">
                <RHFSelect name="followUpUserInChargeId" label="Responsable" disabled={disabled}>
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </TableCell>
              <TableCell align="left" />
              <TableCell align="center">
                {currentCase && (
                  <Button
                    variant="text"
                    onClick={() => navigate(PATH_DASHBOARD.general.cases.followUp(currentCase.id))}
                  >
                    Ver Notas
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EvaluationCaseTable;
