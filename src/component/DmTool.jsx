
import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel,
    Card, CardMedia, CardContent, Chip, Stack, Avatar,
    Switch
} from '@mui/material';
import { ArrowForward, Call, VideoCall } from '@mui/icons-material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const mockThumbnails = [
    { src: 'Images/image1.jpg', alt: 'Post 1' },
    { src: 'Images/image2.jpg', alt: 'Post 2' },
    { src: 'Images/image3.jpg', alt: 'Post 3' }
];

const exampleWords = ['Price', 'Link', 'Shop'];
const tabs = ['Post', 'Comments', 'DM'];

const CommentMock = ({ keywords }) => (
    <Box bgcolor="#2b2b2b" color="#fff" p={2} borderRadius={12} mb={1} position="absolute" bottom={0} left={13} zIndex={5} width={'275px'} marginX={'auto'} height={'350px'} >
        <div className='flex flex-col mb-2 -mt-5 items-center justify-center pt-3 border-b pb-1.5 border-gray-400/30'>
            <div className='border-t-4 border-gray-400 w-[30px] rounded-4xl mb-2'></div>
            <Typography variant="subtitle2" fontWeight={600} >Comments</Typography>
        </div>
        <Box mt={1} display="flex" alignItems="flex-start" gap={1}>
            <Avatar sx={{ width: 20, height: 20 }}>U</Avatar>
            <Box>
                <Typography variant="body2" color="white" fontWeight={500}>Username <span style={{ fontSize: '0.60rem', color: '#ccc' }}>Now</span></Typography>
                <div className='flex flex-wrap gap-2 mt-1'>
                    {keywords.map((word, i) => (
                        <Typography key={i} variant="body2" color="#fff" display={'flex'} gap={5} fontSize={'0.80rem'}>{word}</Typography>
                    ))}
                </div>
                <Typography variant="caption" fontSize={'0.80rem'} color="#ccc">Reply</Typography>
            </Box>
        </Box>
    </Box>
);

const DMMock = ({ dmMessage, openingDMEnabled }) => (
    <Box bgcolor="#000" p={2} color="#fff" position="absolute" bottom={0} left={13} zIndex={5} width={'275px'} marginX={'auto'} height={'600px'} borderRadius={12}>
        <div className='flex mb-2 mt-5 items-center justify-between pt-3 border-b pb-1.5 border-gray-400/30'>

            <div className='flex items-center gap-2 justify-center'>
                <ArrowBackIosNewOutlinedIcon style={{ fontSize: '0.80em' }} />
                <Avatar sx={{ width: 20, height: 20 }}>U</Avatar>
                <Typography variant="body2" color="#aaa">botspacehq</Typography>
            </div>

            <div className='flex items-center gap-2'>
                <CallOutlinedIcon />
                <VideocamOutlinedIcon />
            </div>
        </div>
        {openingDMEnabled && (
            <div className='bg-[#333] rounded-xl rounded-bl-none p-3'>
                <Typography variant="body2">Hey there! I'm so happy you're here, thanks so much for your interest 😊</Typography>
                <Typography variant="body2" mt={1}>Click below and I'll send you the link in just a sec ✨</Typography>
                <div className='p-2 bg-[#222222] rounded-xl shadow-xl mt-1 flex items-center justify-center'>
                    <Typography variant="body2" color="#ccc" marginX={'auto'}>Send me the link</Typography>
                </div>
            </div>
        )}
        <Box mt={2} display="flex" justifyContent="flex-end">
            <div className='bg-[#5c27fe] p-2 rounded-xl rounded-br-none max-w-[70%]'>
                <Typography variant="body2">Send me the link</Typography>
            </div>
        </Box>
        {dmMessage && (
            <Box mt={2} display="flex" justifyContent="flex-start">
                <div className='bg-[#333] p-2 rounded-xl rounded-bl-none max-w-[70%]'>
                    <Typography variant="body2">{dmMessage}</Typography>
                </div>
            </Box>
        )}
    </Box>
);

const DMTool = () => {
    const [selectedOption, setSelectedOption] = useState('specific');
    const [selectedThumbnail, setSelectedThumbnail] = useState(mockThumbnails[0]);
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(1);
    const [openingDMEnabled, setOpeningDMEnabled] = useState(true);
    const [dmMessage, setDmMessage] = useState('');
    const [autoReply, setAutoReply] = useState(false);

    const handleKeywordAdd = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            setKeywords([...keywords, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeywordAddOnClick = (word) => {
        setKeywords([...keywords, word]);
    };

    const handleKeywordDelete = (wordToDelete) => {
        setKeywords(keywords.filter(word => word !== wordToDelete));
    };

    return (
        <Box display="flex" minHeight="100vh" p={2} bgcolor="#f9f9fb">
            <div className='w-[30%] bg-[#fff] p-3 pt-5 rounded-lg overflow-y-scroll h-[95vh] example' >

                {step >= 1 && (
                    <>

                        <Typography variant="h6" fontWeight={600}>When someone comments on</Typography>

                        <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            <FormControlLabel value="specific" control={<Radio />} label="a specific post or reel" />
                            {selectedOption === 'specific' && (
                                <Box display="flex" gap={1} mt={1} ml={4}>
                                    {mockThumbnails.map((thumb, idx) => (
                                        <img
                                            key={idx}
                                            src={thumb.src}
                                            alt={thumb.alt}
                                            width={60}
                                            height={60}
                                            style={{
                                                borderRadius: 8,
                                                objectFit: 'cover',
                                                border: selectedThumbnail.src === thumb.src ? '2px solid #1976d2' : '2px solid transparent',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setSelectedThumbnail(thumb)}
                                        />
                                    ))}
                                </Box>

                            )}

                            <FormControlLabel value="any" control={<Radio />} label="any post or reel" disabled />
                            <FormControlLabel value="next" control={<Radio />} label="next post or reel" disabled />


                        </RadioGroup>
                    </>
                )}



                {step >= 2 && (
                    <Box mt={4}>
                        <Typography variant="h6" fontWeight={600}>And this comment has</Typography>
                        <RadioGroup defaultValue="specific">
                            <FormControlLabel value="specific" control={<Radio />} label="a specific word or words" />
                            <TextField
                                placeholder="Enter a word or multiple"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeywordAdd}
                                sx={{ mt: 1 }}
                            />
                            <Typography variant="caption" color="textSecondary" mt={1}>
                                Use commas or Enter to separate words
                            </Typography>
                            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                                {keywords.map((word, idx) => (
                                    <Chip key={idx} label={word} onDelete={() => handleKeywordDelete(word)} />
                                ))}
                            </Stack>
                            <Box mt={2}>
                                {exampleWords.map((word, i) => (
                                    <Chip key={i} label={word} variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleKeywordAddOnClick(word)} />
                                ))}
                            </Box>
                            <FormControlLabel value="any" control={<Radio />} label="any word" sx={{ mt: 2 }} />
                        </RadioGroup>

                    </Box>
                )}


                {step >= 3 && (
                    <>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600}>They will get</Typography>
                            <Box mt={2} p={2} bgcolor="#f0f0f0" borderRadius={2}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography fontWeight={600}>an opening DM</Typography>
                                    <Switch checked={openingDMEnabled} onChange={() => setOpeningDMEnabled(!openingDMEnabled)} />
                                </Box>
                                {openingDMEnabled && (
                                    <Box mt={2}>
                                        <Typography variant="body2">
                                            Hey there! I'm so happy you're here, thanks so much for your interest 😊
                                        </Typography>
                                        <Typography variant="body2" mt={1}>
                                            Click below and I'll send you the link in just a sec ✨
                                        </Typography>
                                        <TextField
                                            value="Send me the link"
                                            fullWidth
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                )}
                            </Box>

                            <Box mt={3}>
                                <Typography fontWeight={600}>a DM with the link</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    placeholder="Write a message"
                                    value={dmMessage}
                                    onChange={(e) => setDmMessage(e.target.value)}
                                    sx={{ mt: 1 }}
                                    error={!dmMessage}
                                    helperText={!dmMessage ? 'Create the DM you’d like to send' : ''}
                                />
                                <Button variant="outlined" sx={{ mt: 1 }}>+ Add A Link</Button>
                            </Box>

                        </Box>
                    </>
                )}

                {step >= 4 && (
                    <>

                        <Box mt={4}>
                            <Typography variant="h6" fontWeight={600}>Other things to automate</Typography>
                            <FormControlLabel control={<Switch checked={autoReply} onChange={() => setAutoReply(!autoReply)} />} label="Reply under the post so people feel seen and special" sx={{ mt: 2 }} />
                            <FormControlLabel control={<Switch disabled />} label="Follow up to re-engage and build trust" sx={{ mt: 1 }} />
                            <FormControlLabel control={<Switch disabled />} label="Automatically ask for a follow to build your audience" sx={{ mt: 1 }} />
                            <FormControlLabel control={<Switch disabled />} label="Ask for emails in DMs to keep in touch beyond social" sx={{ mt: 1 }} />
                        </Box>
                    </>
                )}

                {step < 4 && (
                    <Button variant="contained" sx={{ mt: 4 }} onClick={() => setStep(prev => prev + 1)}>Next</Button>
                )}

            </div>

            {/* Preview Panel */}
            <Box flexGrow={1} display="flex" flexDirection={'column'} alignItems="center" justifyContent="space-between">
                <div className='-mt-2 flex justify-between w-full'>
                    <button>Preview</button>
                    <button className={`p-2 ${step === 4 ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded-xl px-4`}>Go Live</button>
                </div>

                <Card sx={{ width: 300, overflow: 'hidden', boxShadow: 'none', bgcolor: '#f9f9fb' }}>
                    <div className='relative w-full h-[610px]'>
                        {step === 2 && <CommentMock keywords={keywords} />}
                        {step === 3 && <DMMock openingDMEnabled={openingDMEnabled} dmMessage={dmMessage} />}
                        {step === 4 && <DMMock openingDMEnabled={openingDMEnabled} dmMessage={dmMessage} />}
                        <CardMedia
                            component="img"
                            height="300"
                            image='/Phone.png'
                            alt="Instagram post"
                            className='absolute z-10 top-0 left-0 object-cover'
                        />
                        <img src={selectedThumbnail.src || selectedThumbnail[0]} alt="Image" className='absolute z-0 rounded-[40px] top-2 left-3 w-[277px] h-[598px] object-cover' />
                    </div>
                    <CardContent>
                        <Box position="relative" display="flex" justifyContent="center" gap={2} borderRadius={10} bgcolor="#f3f3f3" px={2} py={1}>
                            {tabs.map((label, i) => (
                                <Button
                                    key={label}
                                    disableRipple
                                    onClick={() => onChange(i + 1)}
                                    sx={{
                                        flex: 1,
                                        height: 32,
                                        minWidth: 17,
                                        px: 1,
                                        borderRadius: 8,
                                        backgroundColor: step === i + 1 ? '#fff' : 'transparent',
                                        color: step === i + 1 ? '#000' : '#666',
                                        fontWeight: step === i + 1 ? 600 : 400,
                                        fontSize: 13,
                                        textTransform: 'none',
                                        boxShadow: step === i + 1 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}


                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default DMTool;
