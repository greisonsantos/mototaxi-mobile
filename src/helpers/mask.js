export default {
  cepMask: (zip_code = '') => {
    return zip_code
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
  dateMask: (date = '') => {
    return date
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  },
  dateHourMask: (date = '') => {
    const dat = new Date(date);
    return dat.toLocaleString()
  },
  phoneMask: (phone = '') => {
    if (phone)
      return phone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
        .replace(/(\d{4})\d+?$/, '$1')
  },
  // eslint-disable-next-line no-dupe-keys
  phoneMask: v => {
    let r = v.replace(/\D/g, '');
    r = r.replace(/^0/, '');
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      r = r.replace(/^(\d*)/, '($1');
    }
    return r;
  },
  hourMask: hour => {
    return hour
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1:$2')
      .replace(/(\d{2})\d+?$/, '$1');
  },
  moneyMask: (value = 0) => {
    return `R$ ${String(value.toFixed(2)).replace('.', ',')}`;
  },

  validaCpf: cpf => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
  plate: val => {
    var myMask = '';
    var mercosul = /([A-Za-z]{3}[0-9]{1}[A-Za-z]{1})/;
    var normal = /([A-Za-z]{3}[0-9]{2})/;
    var replaced = val.replace(/[^\w]/g, '');
    // if (normal.exec(replaced)) {
    //     myMask = 'SSS-0000';
    // } else if (mercosul.exec(replaced)) {
    //     myMask = 'SSS0A00';
    // }
    return myMask;
  },
};
