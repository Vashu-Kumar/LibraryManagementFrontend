import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Divider from '@mui/material/Divider';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Button from '@mui/material/Button';



const LoanCard = ({ loan }) => {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>

                    {/* Book cover */}
                    <Box
                        sx={{
                            width: 80,
                            height: 120,
                            borderRadius: 2,
                            background: "linear-gradient(165deg, #523f3f 0%, #f18f8f 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            cursor: "pointer",
                            transition: "transform 0.3s",
                            '&:hover': {
                                transform: "scale(1.05)"
                            }
                        }}>
                        <MenuBookIcon sx={{ fontSize: 40, color: "#ffffff", opacity: 0.09 }} />
                    </Box>
                    {/* Book details */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">
                            {loan.bookTitle}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <PersonIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                                {loan.bookAuthor}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <NumbersIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant='caption' sx={{ color: "text.secondary" }} >
                                ISBN: {loan.bookIsbn}
                            </Typography>
                        </Box>

                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                    {/* loan details */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                            <Box>
                                <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    Checkout Date
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, color: '#667eea' }} />
                                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                        {loan.checkoutDate}
                                    </Typography>

                                </Box>
                            </Box>

                            <Box>
                                <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    Due Date
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, color: '#667eea' }} />
                                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                        {loan.dueDate}
                                    </Typography>

                                </Box>
                            </Box>

                            {loan.returnDate && <Box>
                                <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    Return Date
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <AssignmentReturnedIcon sx={{ fontSize: 14, color: '#667eea' }} />
                                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                        {loan.returnDate}
                                    </Typography>
                                </Box>
                            </Box>}
                        </Box>
                    </Box>
                </Box>

                {/* Note section */}
                {loan.notes && <Box sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <Typography variant='body2' sx={{ color: 'text.secondary', fontStyle: 'Italic' }}>
                        Note: {loan.notes}
                    </Typography>
                </Box>
                }

                <Divider sx={{ my: 2 }} />
                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'flex-end' }} >

                    <Button variant='outlined' sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#764ba2',
                            bgcolor: 'rgba(102, 126, 234, 0.05)'
                        }
                    }}>View Book Details</Button>

                    {loan.status === 'CHECKED_OUT' && !loan.returnDate && <Button variant='outlined' sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s'

                    }}>Return Book</Button>}
                    
                </Box>
            </CardContent>
        </Card>
    )
}
export default LoanCard