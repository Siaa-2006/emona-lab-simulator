/*
 * Socket coordinates are in pixels on the supplied 1281×1097 trainer photograph.
 * type: "round" or "square" only changes the optional debug outline; both are equally patchable.
 * Every mapped socket can connect to every other mapped socket. There are no input/output restrictions.
 */
window.EMONA_SOCKETS = [
  // TOP: ADDER
  {id:'adder_a',              label:'ADDER · A',                           x:129,y:362,type:'round'},
  {id:'adder_b',              label:'ADDER · B',                           x:128,y:497,type:'round'},
  {id:'adder_out',            label:'ADDER · GA−gB output',                x:188,y:497,type:'round'},

  // TOP: MULTIPLIER 1
  {id:'mult1_x_dc',           label:'MULTIPLIER 1 · X DC',                 x:249,y:229,type:'round'},
  {id:'mult1_x_ac',           label:'MULTIPLIER 1 · X AC',                 x:248,y:262,type:'round'},
  {id:'mult1_y_dc',           label:'MULTIPLIER 1 · Y DC',                 x:249,y:296,type:'round'},
  {id:'mult1_y_ac',           label:'MULTIPLIER 1 · Y AC',                 x:248,y:329,type:'round'},
  {id:'mult1_kxy',            label:'MULTIPLIER 1 · kXY output',           x:308,y:329,type:'round'},

  // TOP: MULTIPLIER 2
  {id:'mult2_x_dc',           label:'MULTIPLIER 2 · X DC',                 x:247,y:430,type:'round'},
  {id:'mult2_y_dc',           label:'MULTIPLIER 2 · Y DC',                 x:248,y:497,type:'round'},
  {id:'mult2_kxy',            label:'MULTIPLIER 2 · kXY output',           x:308,y:497,type:'round'},

  // TOP: TWIN PULSE GENERATOR
  {id:'tpg_q2',               label:'TWIN PULSE GENERATOR · Q2',           x:428,y:364,type:'square'},
  {id:'tpg_clk',              label:'TWIN PULSE GENERATOR · CLK',          x:368,y:499,type:'square'},
  {id:'tpg_q1',               label:'TWIN PULSE GENERATOR · Q1',           x:428,y:499,type:'square'},

  // TOP: DUAL ANALOG SWITCH
  {id:'das_sh_in',            label:'DUAL ANALOG SWITCH · S&H IN',         x:488,y:230,type:'round'},
  {id:'das_sh_out',           label:'DUAL ANALOG SWITCH · S&H OUT',        x:548,y:230,type:'round'},
  {id:'das_in1',              label:'DUAL ANALOG SWITCH · IN 1',           x:488,y:297,type:'round'},
  {id:'das_control1',         label:'DUAL ANALOG SWITCH · CONTROL 1',      x:489,y:364,type:'square'},
  {id:'das_control2',         label:'DUAL ANALOG SWITCH · CONTROL 2',      x:489,y:432,type:'square'},
  {id:'das_in2',              label:'DUAL ANALOG SWITCH · IN 2',           x:487,y:499,type:'round'},
  {id:'das_out',              label:'DUAL ANALOG SWITCH · OUT',            x:548,y:499,type:'round'},

  // TOP: NOISE GENERATOR
  {id:'noise_0db',            label:'NOISE GENERATOR · 0 dB',              x:667,y:230,type:'round'},
  {id:'noise_m6db',           label:'NOISE GENERATOR · −6 dB',             x:667,y:264,type:'round'},
  {id:'noise_m20db',          label:'NOISE GENERATOR · −20 dB',            x:667,y:298,type:'round'},

  // TOP: BUFFER
  {id:'buffer_in',            label:'BUFFER · IN',                         x:607,y:465,type:'round'},
  {id:'buffer_out',           label:'BUFFER · OUT',                        x:667,y:466,type:'round'},
  {id:'buffer_lower_l',       label:'BUFFER · lower left socket',          x:628,y:511,type:'round'},
  {id:'buffer_lower_r',       label:'BUFFER · lower right socket',         x:663,y:512,type:'round'},

  // TOP: CHANNEL MODULE
  {id:'channel_bpf_in',       label:'CHANNEL MODULE · BPF IN',             x:728,y:231,type:'round'},
  {id:'channel_bpf_out',      label:'CHANNEL MODULE · BPF OUT',            x:787,y:231,type:'round'},
  {id:'channel_lpf_in',       label:'CHANNEL MODULE · BASEBAND LPF IN',    x:727,y:298,type:'round'},
  {id:'channel_lpf_out',      label:'CHANNEL MODULE · BASEBAND LPF OUT',   x:787,y:298,type:'round'},
  {id:'channel_noise',        label:'CHANNEL ADDER · NOISE',               x:727,y:399,type:'round'},
  {id:'channel_signal',       label:'CHANNEL ADDER · SIGNAL',              x:725,y:466,type:'round'},
  {id:'channel_out',          label:'CHANNEL ADDER · CHANNEL OUT',         x:787,y:466,type:'round'},

  // TOP: PHASE SHIFTER
  {id:'phase_in',             label:'PHASE SHIFTER · IN',                  x:845,y:466,type:'round'},
  {id:'phase_out',            label:'PHASE SHIFTER · OUT',                 x:905,y:467,type:'round'},

  // TOP: UTILITIES
  {id:'comp_ref',             label:'COMPARATOR · REF',                    x:965,y:231,type:'round'},
  {id:'comp_in',              label:'COMPARATOR · IN',                     x:965,y:299,type:'round'},
  {id:'comp_out',             label:'COMPARATOR · OUT',                    x:1025,y:299,type:'square'},
  {id:'rect_in',              label:'RECTIFIER · IN',                      x:965,y:367,type:'round'},
  {id:'rect_out',             label:'RECTIFIER · OUT',                     x:1025,y:367,type:'round'},
  {id:'diode_rc_in',          label:'DIODE & RC LPF · IN',                 x:965,y:434,type:'round'},
  {id:'diode_rc_out',         label:'DIODE & RC LPF · OUT',                x:1025,y:434,type:'round'},
  {id:'rc_lpf_in',            label:'RC LPF · IN',                         x:964,y:501,type:'round'},
  {id:'rc_lpf_out',           label:'RC LPF · OUT',                        x:1024,y:501,type:'round'},

  // TOP: TUNEABLE LPF
  {id:'tune_fcx100',          label:'TUNEABLE LPF · fc×100',               x:1146,y:232,type:'square'},
  {id:'tune_in',              label:'TUNEABLE LPF · IN',                   x:1084,y:501,type:'round'},
  {id:'tune_out',             label:'TUNEABLE LPF · OUT',                  x:1145,y:502,type:'round'},

  // TOP GROUND JACKS
  {id:'gnd_top_left',         label:'GND · upper left',                    x:338,y:557,type:'round'},
  {id:'gnd_top_right',        label:'GND · upper right',                   x:816,y:559,type:'round'},

  // BOTTOM: VARIABLE DCV
  {id:'dcu_plus5',            label:'VARIABLE DCV · +5 V',                 x:188,y:645,type:'square'},
  {id:'dcu_vdc',              label:'VARIABLE DCV · VDC',                  x:188,y:679,type:'round'},
  {id:'dcu_gnd',              label:'VARIABLE DCV · GND',                  x:188,y:711,type:'round'},

  // BOTTOM: SPEECH / EXOR
  {id:'speech_a',             label:'SPEECH · A',                          x:122,y:848,type:'round'},
  {id:'speech_b',             label:'SPEECH · B',                          x:188,y:845,type:'round'},
  {id:'exor_a',               label:'EXOR · A',                            x:127,y:913,type:'square'},
  {id:'exor_b',               label:'EXOR · B',                            x:127,y:947,type:'square'},
  {id:'exor_out',             label:'EXOR · A⊕B',                          x:187,y:946,type:'square'},

  // BOTTOM: VCO
  {id:'vco_digital',          label:'VCO · DIGITAL',                       x:308,y:646,type:'square'},
  {id:'vco_input',            label:'VCO · VCO INPUT',                     x:247,y:914,type:'round'},
  {id:'vco_sine',             label:'VCO · SINE',                          x:307,y:914,type:'round'},

  // BOTTOM: SEQUENCE GENERATOR
  {id:'seq_line_code',        label:'SEQUENCE GENERATOR · LINE CODE',      x:428,y:680,type:'round'},
  {id:'seq_sync',             label:'SEQUENCE GENERATOR · SYNC',           x:427,y:747,type:'square'},
  {id:'seq_x',                label:'SEQUENCE GENERATOR · X',              x:427,y:780,type:'square'},
  {id:'seq_clk',              label:'SEQUENCE GENERATOR · CLK',            x:367,y:814,type:'square'},
  {id:'seq_y',                label:'SEQUENCE GENERATOR · Y',              x:427,y:814,type:'square'},
  {id:'divider_in',           label:'DIVIDER · IN',                        x:366,y:948,type:'square'},
  {id:'divider_out',          label:'DIVIDER · OUT',                       x:425,y:948,type:'square'},

  // BOTTOM: PCM ENCODER
  {id:'pcm_enc_input2',       label:'PCM ENCODER · INPUT 2',               x:486,y:781,type:'round'},
  {id:'pcm_enc_fs',           label:'PCM ENCODER · FS',                    x:546,y:781,type:'square'},
  {id:'pcm_enc_input1',       label:'PCM ENCODER · INPUT 1',               x:486,y:848,type:'round'},
  {id:'pcm_enc_clk',          label:'PCM ENCODER · CLK',                   x:486,y:915,type:'square'},
  {id:'pcm_enc_data',         label:'PCM ENCODER · PCM DATA',              x:546,y:915,type:'square'},

  // BOTTOM: MASTER SIGNALS
  {id:'master_100k_sine',     label:'MASTER SIGNALS · 100 kHz SINE',       x:665,y:781,type:'round'},
  {id:'master_100k_cos',      label:'MASTER SIGNALS · 100 kHz COS',        x:665,y:816,type:'round'},
  {id:'master_100k_digital',  label:'MASTER SIGNALS · 100 kHz DIGITAL',    x:665,y:849,type:'square'},
  {id:'master_8k_digital',    label:'MASTER SIGNALS · 8 kHz DIGITAL',      x:665,y:882,type:'square'},
  {id:'master_2k_digital',    label:'MASTER SIGNALS · 2 kHz DIGITAL',      x:665,y:916,type:'square'},
  {id:'master_2k_sine',       label:'MASTER SIGNALS · 2 kHz SINE',         x:664,y:949,type:'round'},

  // BOTTOM: MULTIPLIER
  {id:'mult3_x_dc',           label:'LOWER MULTIPLIER · X DC',             x:726,y:682,type:'round'},
  {id:'mult3_y_dc',           label:'LOWER MULTIPLIER · Y DC',             x:725,y:749,type:'round'},
  {id:'mult3_kxy',            label:'LOWER MULTIPLIER · kXY output',       x:785,y:749,type:'round'},

  // BOTTOM: SERIAL TO PARALLEL
  {id:'s2p_serial',           label:'SERIAL TO PARALLEL · SERIAL',         x:724,y:883,type:'square'},
  {id:'s2p_x1',               label:'SERIAL TO PARALLEL · X1',             x:784,y:883,type:'round'},
  {id:'s2p_clk',              label:'SERIAL TO PARALLEL · CLK',            x:724,y:949,type:'square'},
  {id:'s2p_x2',               label:'SERIAL TO PARALLEL · X2',             x:783,y:950,type:'round'},

  // BOTTOM: PCM DECODER
  {id:'pcm_dec_fs',           label:'PCM DECODER · FS',                    x:844,y:783,type:'square'},
  {id:'pcm_dec_data',         label:'PCM DECODER · PCM DATA',              x:843,y:850,type:'square'},
  {id:'pcm_dec_output2',      label:'PCM DECODER · OUTPUT 2',              x:903,y:850,type:'round'},
  {id:'pcm_dec_clk',          label:'PCM DECODER · CLK',                   x:843,y:917,type:'square'},
  {id:'pcm_dec_output1',      label:'PCM DECODER · OUTPUT 1',              x:903,y:917,type:'round'}
];

window.EMONA_TASKS = [
  {
    id:'buffer_lpf',
    name:'Easy · Buffer → LPF',
    text:'Patch 2 kHz SINE → BUFFER IN, then BUFFER OUT → TUNEABLE LPF IN.',
    hint:'Two patch leads.',
    connections:[['master_2k_sine','buffer_in'],['buffer_out','tune_in']]
  },
  {
    id:'channel_noise',
    name:'Easy · Signal + noise',
    text:'Patch 2 kHz SINE to CHANNEL ADDER SIGNAL, and −6 dB NOISE to CHANNEL ADDER NOISE.',
    hint:'The two adder inputs can be patched independently.',
    connections:[['master_2k_sine','channel_signal'],['noise_m6db','channel_noise']]
  },
  {
    id:'multiplier',
    name:'Easy · Multiplier',
    text:'Patch 2 kHz SINE to LOWER MULTIPLIER X DC and 100 kHz SINE to LOWER MULTIPLIER Y DC.',
    hint:'The simulator does not prevent you from using a different pair; this task checks these exact two.',
    connections:[['master_2k_sine','mult3_x_dc'],['master_100k_sine','mult3_y_dc']]
  },
  {
    id:'pcm_data',
    name:'PCM · Data path',
    text:'Patch 2 kHz SINE → PCM ENCODER INPUT 1, then PCM ENCODER PCM DATA → PCM DECODER PCM DATA.',
    hint:'Square PCM DATA ports are fully active in this version.',
    connections:[['master_2k_sine','pcm_enc_input1'],['pcm_enc_data','pcm_dec_data']]
  },
  {
    id:'pcm_clock',
    name:'PCM · Clock + data',
    text:'Connect PCM ENCODER PCM DATA → PCM DECODER PCM DATA and PCM ENCODER CLK → PCM DECODER CLK.',
    hint:'Both square CLK/data sockets can be patched.',
    connections:[['pcm_enc_data','pcm_dec_data'],['pcm_enc_clk','pcm_dec_clk']]
  },
  {
    id:'vdc_vco',
    name:'VCO · Variable DC',
    text:'Patch VARIABLE DCV VDC → VCO INPUT.',
    hint:'+5 V, VDC and GND are separate mapped sockets.',
    connections:[['dcu_vdc','vco_input']]
  },
  {
    id:'digital_exor',
    name:'Digital · EXOR',
    text:'Patch 2 kHz DIGITAL → EXOR A and 8 kHz DIGITAL → EXOR B.',
    hint:'These are square digital sockets.',
    connections:[['master_2k_digital','exor_a'],['master_8k_digital','exor_b']]
  },
  {
    id:'vco_switch',
    name:'VCO · HI / LO switch',
    text:'Set the VCO toggle to HI and patch VARIABLE DCV VDC → VCO INPUT.',
    hint:'Click the VCO switch on the actual board photo to select HI.',
    connections:[['dcu_vdc','vco_input']],
    switches:{vco:'HI'}
  },
  {
    id:'phase_switch',
    name:'Phase Shifter · 180°',
    text:'Set the PHASE SHIFTER toggle to 180° and patch 2 kHz SINE → PHASE SHIFTER IN.',
    hint:'Click the small 0°/180° toggle on the photo.',
    connections:[['master_2k_sine','phase_in']],
    switches:{phase:'180°'}
  },
  {
    id:'pcm_switch',
    name:'PCM Encoder · PCM mode',
    text:'Set PCM ENCODER to PCM and patch 2 kHz SINE → PCM ENCODER INPUT 1.',
    hint:'Use the photographed PCM/TDM switch; no wire goes into the switch itself.',
    connections:[['master_2k_sine','pcm_enc_input1']],
    switches:{pcm:'PCM'}
  }
];
