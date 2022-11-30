import { CurrentCase } from 'src/@types/case';
import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import Table from './Table';
import dayjs from 'dayjs';

Font.register({
  family: 'Circular',
  src: '/fonts/CircularStd-Book.otf',
});

Font.register({
  family: 'Circular-Bold',
  src: '/fonts/CircularStd-Bold.otf',
});

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 48,
  },
  section: { marginVertical: 30 },
  logo: {
    width: 200,
    marginBottom: 14,
  },
  headerLabel: {
    fontSize: 12,
    fontFamily: 'Circular-Bold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Circular-Bold',
  },
  label: {
    fontSize: 9,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: 'Circular-Bold',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Circular',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F2F2F2',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

type Props = {
  cases: CurrentCase[];
  month: string;
};

const CaseDocument = ({ cases, month }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.section]}>
        <Image source="/assets/logo-pgr-azul.png" style={styles.logo} />
        <Text style={styles.title}>Módulo de Servicios a la Víctima</Text>
        <Text style={styles.headerLabel}>Casos Registrados en el Mes de {month}</Text>
      </View>
      <View style={styles.divider} />
      <Table>
        <Table.Header>
          <Table.HeaderCell style={{ width: '8%' }}>Código</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '25%' }}>Víctima</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '12%' }}>ESO Inicial</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '12%' }}>ESO Cierre</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '12%' }}>ESO Post</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '11%' }}>Estado</Table.HeaderCell>
          <Table.HeaderCell style={{ width: '20%' }}>Fecha de Creación</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {cases.map((entry) => (
            <Table.Row key={entry.id}>
              <Table.Cell style={{ width: '8%' }}>{entry.code}</Table.Cell>
              <Table.Cell style={{ width: '25%' }}>{entry.victim.name}</Table.Cell>
              <Table.Cell style={{ width: '12%' }}>
                {entry.initialSurvivorEvaluation.total}
              </Table.Cell>
              <Table.Cell style={{ width: '12%' }}>
                {entry.finalSurvivorEvaluation.total}
              </Table.Cell>
              <Table.Cell style={{ width: '12%' }}>{entry.postSurvivorEvaluation.total}</Table.Cell>
              <Table.Cell style={{ width: '11%' }}>
                {entry.inactive ? 'Inactivo' : entry.completed ? 'Cerrado' : 'Activo'}
              </Table.Cell>
              <Table.Cell style={{ width: '20%' }}>
                {entry.createdAt ? dayjs(entry.createdAt).format('DD/MM/YYYY') : '--'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Page>
  </Document>
);

export default CaseDocument;
