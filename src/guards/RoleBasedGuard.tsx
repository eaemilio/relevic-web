import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets';
import { Module } from 'src/@types/module';
import { CurrentUser } from 'src/@types/user';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  children: React.ReactNode;
  moduleId?: number;
  onlyRootProvider?: boolean;
};

export default function RoleBasedGuard({
  hasContent,
  children,
  moduleId,
  onlyRootProvider = false,
}: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuth();

  const permissions = ((user?.role?.permissions as Module[]) ?? []).map((p) => p.id);
  const { provider } = user as CurrentUser;

  if (
    (typeof moduleId !== 'undefined' && !permissions.includes(moduleId)) ||
    (onlyRootProvider && provider?.id !== 1)
  ) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permiso Denegado
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            No tienes permisos para acceder al contenido de esta página.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
