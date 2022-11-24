import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import { MARITAL_STATUES, Victim } from 'src/@types/victim';

Font.register({
  family: 'Circular',
  src: '/fonts/CircularStd-Book.otf',
});

Font.register({
  family: 'Circular-Bold',
  src: '/fonts/CircularStd-Bold.otf',
});

type Props = {
  victim?: Victim;
};

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

const DemographicDocument = ({ victim }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.section]}>
        <Image source="/assets/logo-pgr-azul.png" style={styles.logo} />
        <Text style={styles.title}>Módulo de Servicios a la Víctima</Text>
        <Text style={styles.headerLabel}>Fícha de Víctima</Text>
        <Text style={styles.headerLabel}>{victim?.name}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={[styles.column, { marginRight: 10 }]}>
            <View style={styles.info}>
              <Text style={styles.label}>Nombre (como se indica):</Text>
              <Text style={styles.text}>{victim?.name ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Otros nombres usados:</Text>
              <Text style={styles.text}>
                {victim?.otherName.trim() === '' ? '--' : victim?.otherName}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Edad, indicado:</Text>
              <Text style={styles.text}>{victim?.age ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Edad, verificada:</Text>
              <Text style={styles.text}>{victim?.verifiedAge ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Fecha de Nacimiento (Si es conocida)</Text>
              <Text style={styles.text}>{victim?.birthday ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Número de teléfono</Text>
              <Text style={styles.text}>
                {victim?.phoneNumber.trim() === '' ? '--' : victim?.phoneNumber}
              </Text>
            </View>
          </View>
          <View style={[styles.column]}>
            <View style={styles.info}>
              <Text style={styles.label}>Ciudadanía</Text>
              <Text style={styles.text}>{victim?.citizenship ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Etnicidad</Text>
              <Text style={styles.text}>{victim?.ethnicity ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>País/Providencia de Origen</Text>
              <Text style={styles.text}>{victim?.nationality ?? '--'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Estado Civil</Text>
              <Text style={styles.text}>
                {MARITAL_STATUES.find((m) => m.value === victim?.maritalStatus)?.label}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Hijos</Text>
              <Text style={styles.text}>{victim?.children === 0 ? 'No' : victim?.children}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Idioma preferido</Text>
              <Text style={styles.text}>
                {victim?.preferredLanguage.trim() === '' ? '--' : victim?.preferredLanguage}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.info}>
          <Text style={styles.label}>Dirección (de origen)</Text>
          <Text style={styles.text}>
            {victim?.originAddress.trim() === '' ? '--' : victim?.originAddress}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Dirección (actual)</Text>
          <Text style={styles.text}>
            {victim?.currentAddress.trim() === '' ? '--' : victim?.currentAddress}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DemographicDocument;
