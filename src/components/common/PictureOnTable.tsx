import { Avatar, Box, Tooltip } from '@mui/material'

interface PictureOnTableProps {
  row: any;
  navigate: (path: string) => void;
}

export const PictureOnTable = ({ row, navigate }: PictureOnTableProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip
        title={row.donante.name}
        placement="top"
        onClick={() => navigate(`/public/profile/${row.donante.id}`)}
        >
        {
            row.donante.profilePicture ? (
            <Avatar
                alt={row.donante.name}
                src={row.donante.profilePicture || '/default-avatar.png'}
                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16, cursor: 'pointer' }}
                onClick={() => navigate(`/public/profile/${row.donante.id}`)}
            />
            ) : (
            <Avatar
                sx={{ width: 40, height: 40, backgroundColor: '#ccc', marginRight: 2 }}
                onClick={() => navigate(`/public/profile/${row.donante.id}`)}
                title="Ver perfil del donante"
            >
                {row.donante.name.charAt(0).toUpperCase()}
            </Avatar>
            )
        }
        </Tooltip>
    </Box>
  )
}
