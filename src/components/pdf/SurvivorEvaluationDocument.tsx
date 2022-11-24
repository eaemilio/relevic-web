import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import { NetworkCase } from 'src/@types/case';
import {
  SurvivorEvaluation,
  SurvivorEvaluationPhase,
  VIOLENCE_TYPES,
} from 'src/@types/survivor-evaluation';

Font.register({
  family: 'Circular',
  src: '/fonts/CircularStd-Book.otf',
});

Font.register({
  family: 'Circular-Bold',
  src: '/fonts/CircularStd-Bold.otf',
});

type Props = {
  currentSurvivorEvaluation: SurvivorEvaluation;
  currentCase: NetworkCase;
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
    color: '#646464',
  },
  sectionTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 10,
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

const SurvivorEvaluationDocument = ({ currentCase, currentSurvivorEvaluation }: Props) => {
  const getPhase = (p: SurvivorEvaluationPhase) => {
    switch (p) {
      case SurvivorEvaluationPhase.START:
        return 'Inicio del caso';
      case SurvivorEvaluationPhase.END:
        return 'Cierre del caso';
      case SurvivorEvaluationPhase.POST:
        return 'Un año después del cierre';
      default:
        return '';
    }
  };
  const getAnswer = (value: number) => {
    switch (value) {
      case 1:
        return 'Muy Vulnerable';
      case 2:
        return 'Vulnerable';
      case 3:
        return 'Estable';
      default:
        return 'Muy Estable';
    }
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.section]}>
          <Image source="/assets/logo-pgr-azul.png" style={styles.logo} />
          <Text style={styles.title}>Módulo de Servicios a la Víctima</Text>
          <Text style={styles.headerLabel}>
            Evaluación de Sobreviviente - {getPhase(currentSurvivorEvaluation.phase)}
          </Text>
          <Text style={styles.headerLabel}>Caso {currentCase.code}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={[styles.column, { marginRight: 10 }]}>
              <View style={styles.info}>
                <Text style={styles.label}>Nombre de la víctima:</Text>
                <Text style={styles.text}>{currentCase.victim?.name ?? '--'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Tipo de Violencia</Text>
                <Text style={styles.text}>
                  {
                    VIOLENCE_TYPES.find((m) => m.value === currentSurvivorEvaluation.violenceType)
                      ?.label
                  }
                </Text>
              </View>
            </View>
            <View style={[styles.column]}>
              <View style={styles.info}>
                <Text style={styles.label}>Lugar donde se está realizando la evaluación:</Text>
                <Text style={styles.text}>
                  {currentSurvivorEvaluation.place.trim() ? currentSurvivorEvaluation.place : '--'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de Seguridad - {currentSurvivorEvaluation.securityTotal} puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>
              1. EL SOBREVIVIENTE YA NO EXPERIMENTA ABUSO NI NEGLIGENCIA.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.security1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              2. EL SOBREVIVIENTE YA NO EXPERIMENTA AMENAZAS DE PARTE DE PERSONAS SOSPECHOSAS U
              OTROS QUE INTENTEN RE-VICTIMIZAR.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.security2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. EL SOBREVIVIENTE ES CAPAZ DE IDENTIFICAR Y MANEJAR LAS SITUACIONES DE RIESGO.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.security3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.securityNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.securityNotes}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de Protección Legal - {currentSurvivorEvaluation.legalProtectionTotal} puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>
              1. SOBREVIVIENTE CONOCE SUS DERECHOS Y LAS PROTECCIONES BAJO LA LEY Y PERCIBE LAS
              VIOLACIONES COMO ABUSIVAS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.legalProtection1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              2. EL ESTADO LEGAL O NIVEL DE DOCUMENTACIÓN DEL SOBREVIVIENTE MINIMIZA LOS RIESGOS DE
              VIOLACIONES FUTURAS A SUS DERECHOS HUMANOS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.legalProtection2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. SOBREVIVIENTE TIENE ACCESO AL SISTEMA DE JUSTICIA PARA BUSCAR PROTECCIÓN Y/O
              REPARACIONES POR VIOLACIONES A LOS DERECHOS HUMANOS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.legalProtection3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.legalProtectionNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.legalProtectionNotes}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de Bienestar Mental - {currentSurvivorEvaluation.mentalWelfareTotal} puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>1. SOBREVIVIENTE NO MANIFIESTA CONDUCTAS DE RIESGO.</Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.mentalWelfare1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              2. SOBREVIVIENTE SE INVOLUCRA POSITIVAMENTE EN ACTIVIDADES DIARIAS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.mentalWelfare2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. SOBREVIVIENTE UTILIZA HABILIDADES DE AFRONTAMIENTO POSITIVAS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.mentalWelfare3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              4. SOBREVIVIENTE DEMUESTRA ACTITUDES Y COMPORTAMIENTOS DE EMPODERAMIENTO.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.mentalWelfare4)}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.mentalWelfareNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.mentalWelfareNotes}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de empoderamiento económico y educación - {currentSurvivorEvaluation.financial}{' '}
            puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>
              1. EL HOGAR DEL SOBREVIVIENTE MANTIENE UN INGRESO ECONÓMICO ADECUADO SIN REALIZAR
              TRABAJO RELACIONADO CON LA EXPLOTACIÓN.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.financial1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              2. SOBREVIVIENTE DEMUESTRA HABILIDADES DE GESTIÓN FINANCIERA.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.financial2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. EL HOGAR DEL SOBREVIVIENTE TIENE ACCESO A UNA RED DE SEGURIDAD FINANCIERA ADECUADA.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.financial3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              4. SOBREVIVIENTE SE RELACIONA POSITIVAMENTE CON LA ESCUELA O EL TRABAJO.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.financial4)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.financialNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.financialNotes}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de Apoyo Social - {currentSurvivorEvaluation.social} puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>
              1. SOBREVIVIENTE SE SIENTE APOYADO EMOCIONALMENTE CON RELACIONES POSITIVAS.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.social1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>2. EL HOGAR DEL SOBREVIVIENTE APOYA SU BIENESTAR.</Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.social2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. SOBREVIVIENTE NO EXPERIMENTA DISCRIMINACIÓN NI PRESIÓN SOCIAL NEGATIVA.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.social3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              4. SOBREVIVIENTE TIENE ACCESO A RECURSOS Y APOYO DE LA COMUNIDAD.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.social4)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.socialNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.socialNotes}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dominio de Bienestar Físico - {currentSurvivorEvaluation.physical} puntos
          </Text>
          <View style={styles.info}>
            <Text style={styles.label}>
              1. SOBREVIVIENTE TIENE ACCESO A SERVICIOS MÉDICOS ESENCIALES.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.physical1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>2. SOBREVIVIENTE CUIDA SUS NECESIDADES DE SALUD.</Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.physical2)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>
              3. SOBREVIVIENTE TIENE ACCESO A LAS NECESIDADES BÁSICAS ADECUADAS QUE IMPACTAN LA
              SALUD.
            </Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.physical3)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>4. SOBREVIVIENTE TIENE VIVIENDA ESTABLE.</Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.physical4)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>5. LA VIVIENDA ESTÁ SEGURA Y LIBRE DE PELIGROS.</Text>
            <Text style={styles.text}>{getAnswer(currentSurvivorEvaluation.physical5)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Notas</Text>
            <Text style={styles.text}>
              {currentSurvivorEvaluation.physicalNotes.trim() === ''
                ? '--'
                : currentSurvivorEvaluation.physicalNotes}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            TOTAL: {currentSurvivorEvaluation.total}/4, LA VÍCTIMA
            {currentSurvivorEvaluation.total < 3 && ' NO'} ESTÁ RESTAURADA
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SurvivorEvaluationDocument;
