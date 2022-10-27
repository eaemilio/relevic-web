import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Label from 'src/components/Label';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { _userList } from 'src/_mock';
import { useTheme } from '@mui/material/styles';
import { UserManager } from 'src/@types/user';
import { RHFSelect } from 'src/components/hook-form';
import { NetworkCase } from 'src/@types/case';

const TABLE_HEAD = [
  { id: 'description', label: 'Evaluación', align: 'left' },
  { id: 'userInCharge', label: 'Responsable', align: 'left' },
  { id: 'completed', label: 'Estado', align: 'left' },
];

function EvaluationCaseTable({
  providerContacts,
  currentCase,
}: {
  providerContacts: UserManager[];
  currentCase?: NetworkCase;
}) {
  const theme = useTheme();
  const { order, orderBy, onSort } = useTable();
  const tableData = [
    {
      completed: false,
      userInCharge: _userList[1],
      description:
        'Completar un FORMULARIO DEMOGRÁFICO para recolectar la información básica del sobreviviente.',
      id: 1,
      key: 'demographicForm',
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description:
        'Realizar una EVALUACIÓN DEL SOBREVIVIENTE (ESO) inicial. Nota: debe pasar dentro del primer mes de un caso nuevo',
      id: 2,
      key: 'initialSurvivorEvaluation',
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description:
        'Elaborar un PROTOCOLO DE ATENCIÓN para el/la sobreviviente, orientado especialmente a las áreas prioritarias reveladas por la primera ESO.',
      id: 3,
      key: 'attentionProtocol',
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description: `Se deben realizar NOTAS DE SEGUIMIENTO luego de cada visita/contacto con el/la sobreviviente. Como mínimo, esta nota debe documentar
      - El nombre de él/la sobreviviente
      - El nombre de la persona que dio el seguimiento y la institución a la que pertenece
      - La fecha en que el seguimiento se dio
      - Una descripción del encuentro y el estado de él/la sobreviviente - Una breve evaluación del caso`,
      id: 4,
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description:
        'Se debe dar seguimiento por lo menos mensual al sobreviviente. El seguimiento mensual debe funcionar como una diligencia que el coordinador del caso designa dentro del caso.',
      id: 5,
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description: 'Se debe realizar una ESO final al cierre del caso.',
      id: 6,
    },
    {
      completed: false,
      userInCharge: _userList[1],
      description:
        'A un año luego del cierre del caso, se debe realizar una ESO para ver si la restauración se ha sostenido.',
      id: 7,
    },
  ];
  return (
    <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
      <Table size={'medium'}>
        <TableHeadCustom
          order={order}
          orderBy={orderBy}
          headLabel={TABLE_HEAD}
          rowCount={tableData.length}
          onSort={onSort}
        />
        <TableBody>
          <TableRow hover key={1}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              Completar un FORMULARIO DEMOGRÁFICO para recolectar la información básica del
              sobreviviente.
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="demographicForm.userInChargeId" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={currentCase?.demographicForm?.completed ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentCase?.demographicForm?.completed ? 'Completado' : 'Pendiente'}
              </Label>
            </TableCell>
          </TableRow>

          <TableRow hover key={2}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              Realizar una EVALUACIÓN DEL SOBREVIVIENTE (ESO) inicial. Nota: debe pasar dentro del
              primer mes de un caso nuevo
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="initialSurvivorEvaluation.userInChargeId" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={currentCase?.initialSurvivorEvaluation?.completed ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentCase?.initialSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
              </Label>
            </TableCell>
          </TableRow>

          <TableRow hover key={3}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              Elaborar un PROTOCOLO DE ATENCIÓN para el/la sobreviviente, orientado especialmente a
              las áreas prioritarias reveladas por la primera ESO.
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="attentionProtocol.userInChargeId" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={currentCase?.attentionProtocol?.completed ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentCase?.attentionProtocol?.completed ? 'Completado' : 'Pendiente'}
              </Label>
            </TableCell>
          </TableRow>

          <TableRow hover key={4}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              Se debe realizar una ESO final al cierre del caso.
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="finalSurvivorEvaluation.userInChargeId" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={currentCase?.finalSurvivorEvaluation?.completed ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentCase?.finalSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
              </Label>
            </TableCell>
          </TableRow>

          <TableRow hover key={5}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              A un año luego del cierre del caso, se debe realizar una ESO para ver si la
              restauración se ha sostenido.
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="postSurvivorEvaluation.userInChargeId" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={currentCase?.postSurvivorEvaluation?.completed ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentCase?.postSurvivorEvaluation?.completed ? 'Completado' : 'Pendiente'}
              </Label>
            </TableCell>
          </TableRow>

          <TableRow hover key={6}>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              Se deben realizar NOTAS DE SEGUIMIENTO luego de cada visita/contacto con el/la
              sobreviviente.
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
              <RHFSelect name="followUpUserInCharge" label="Responsable">
                <option key={0} value={0} />
                {(providerContacts ?? []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </RHFSelect>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EvaluationCaseTable;
