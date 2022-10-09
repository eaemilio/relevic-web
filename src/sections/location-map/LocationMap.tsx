import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/Iconify';
import { useTheme } from '@mui/material/styles';
import './LocationMap.Module.css';

const DEFAULT_ZOOM = 18;

type LocationMarkerProps = {
  dragging: boolean;
};

type LocationMapProps = {
  zoom?: number;
};

function LocationMarker({ dragging }: LocationMarkerProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${dragging ? 65 : 40}px`,
        height: `${dragging ? 65 : 40}px`,
      }}
      className={`${dragging && 'dragging'} marker`}
    >
      <Iconify
        icon="carbon:location-filled"
        width={'100%'}
        height={'100%'}
        color={theme.palette.primary.main}
      />
    </Box>
  );
}

function LocationMap({ zoom = DEFAULT_ZOOM }: LocationMapProps) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLat(coords.latitude);
      setLng(coords.longitude);
    });
  }, []);

  const onDragEnd = (e: any) => {
    setLat(e.center.lat());
    setLng(e.center.lng());
    setDragging(false);
  };

  const onDrag = () => {
    setDragging(true);
  };

  return (
    <Box sx={{ mt: 2, height: 500, position: 'relative' }}>
      {lng && lat && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBTNIT54hV63Qw5kiWp_AGh5RaJqT79-RI' }}
          center={{ lat, lng }}
          defaultZoom={zoom}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
        />
      )}
      <LocationMarker dragging={dragging} />
    </Box>
  );
}

export default LocationMap;
